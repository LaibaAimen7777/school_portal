import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User, UserRole } from 'src/users/entities/user.entity';
import { DataSource, Repository, In } from 'typeorm';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { Teacher } from './entities/teacher.entity';
import { Subject } from 'src/subject/entities/subject.entity';
import { Schedule } from 'src/schedule/entities/schedule.entity';
import { Student } from 'src/student/entities/student.entity';

function generatePassword() {
  return crypto.randomBytes(8).toString('hex');
}

@Injectable()
export class TeachersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,

    @InjectRepository(Teacher)
    private teacherRepository: Repository<Teacher>,

    @InjectRepository(Subject)
    private subjectRepository: Repository<Subject>,

    @InjectRepository(Schedule)
    private scheduleRepository: Repository<Schedule>,

    @InjectRepository(Student)
    private studentRepository: Repository<Student>,

    private dataSource: DataSource,
  ) {}
  async create(dto: CreateTeacherDto) {
    return this.dataSource.transaction(async (manager) => {
      const teacherRepo = manager.getRepository(Teacher);
      const userRepo = manager.getRepository(User);

      const teacherCount = await teacherRepo.count();
      const username = `TCH${(teacherCount + 1).toString().padStart(3, '0')}`;
      const plainPassword = generatePassword();
      const hashedPassword = await bcrypt.hash(plainPassword, 10);

      const user = manager.create(User, {
        username,
        password: hashedPassword,
        role: UserRole.TEACHER,
        canLogin: 1,
        mustChangePassword: 1,
        isActive: 1,
      });
      const savedUser = await userRepo.save(user);

      const teacherCode = `T-${(teacherCount + 1).toString().padStart(3, '0')}`;

      const teacher = teacherRepo.create({
        teacherCode,
        fullName: dto.fullName,
        qualification: dto.qualification,
        hireDate: dto.hireDate,
        user: savedUser,
        subjects: [], // ✅ initialize empty so TypeORM tracks the relation
      });

      // ✅ Save teacher first to get an ID
      const savedTeacher = await teacherRepo.save(teacher);

      // ✅ Then assign subjects and save again so junction table gets populated
      if (dto.subjectIds && dto.subjectIds.length > 0) {
        const subjects = await manager
          .createQueryBuilder(Subject, 'subject')
          .where('subject.id IN (:...ids)', { ids: dto.subjectIds })
          .getMany();

        console.log('Found subjects:', subjects); // ✅ are subjects actually found?
        console.log('Teacher ID:', savedTeacher.id);

        savedTeacher.subjects = subjects;
        const result = await teacherRepo.save(savedTeacher);
        console.log('Saved teacher subjects:', result.subjects);
      }

      return {
        teacherId: savedTeacher.id,
        username,
        temporaryPassword: plainPassword,
      };
    });
  }

  async findAll() {
    console.log('in b in ts');
    return this.teacherRepository.find({
      relations: ['subjects', 'user'],
      order: { id: 'DESC' },
    });
  }

  async remove(id: number) {
    const teacher = await this.teacherRepository.findOne({
      where: { id },
      relations: ['user'],
    });
    if (!teacher) throw new NotFoundException('Teacher not found');

    // Remove junction table entries first
    await this.dataSource.query(
      `DELETE FROM teachers_subjects_subjects WHERE teachersId = ?`,
      [id],
    );

    // Deactivate user account
    if (teacher.user) {
      await this.userRepository.update(teacher.user.id, { is_active: false });
    }

    await this.teacherRepository.remove(teacher);
    return { message: 'Teacher deleted successfully' };
  }

  async getDashboard(userId: number) {
    const teacher = await this.teacherRepository.findOne({
      where: { user: { id: userId } },
      relations: ['subjects', 'schedules'],
    });

    if (!teacher) throw new NotFoundException('Teacher not found');

    const teacherId = teacher.id;

    const schedules = await this.scheduleRepository.find({
      where: { teacher: { id: teacherId } },
      relations: ['schoolClass', 'subject', 'room'], // ✅ load relations
      order: { dayOfWeek: 'ASC', startTime: 'ASC' },
    });

    // ✅ Guard against empty schedules before mapping
    const classIds = schedules
      .map((s) => s.schoolClass?.id)
      .filter(Boolean) as number[];

    const students =
      classIds.length > 0
        ? await this.studentRepository.find({
            where: { schoolClass: { id: In(classIds) } },
            relations: ['schoolClass'],
          })
        : [];

    return {
      teacher,
      schedules,
      students,
    };
  }
}
