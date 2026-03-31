import { Injectable } from '@nestjs/common';
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
      // 1️⃣ Generate username
      const teacherCount = await teacherRepo.count();
      const username = `TCH${(teacherCount + 1).toString().padStart(3, '0')}`;
      // 2️⃣ Generate password
      const plainPassword = generatePassword();
      const hashedPassword = await bcrypt.hash(plainPassword, 10);
      // 3️⃣ Create user
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
      // 4️⃣ Create teacher profile
      const teacher = teacherRepo.create({
        teacherCode,
        fullName: dto.fullName,
        qualification: dto.qualification,
        // specialization: dto.specialization,
        hireDate: dto.hireDate,
        user: savedUser,
      });
      const subjects = await manager.find(Subject, {
        where: { id: In(dto.subjectIds) },
      });

      teacher.subjects = subjects;
      const savedTeacher = await teacherRepo.save(teacher);
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

  async getDashboard(userId: number) {
    // console.log('teacher id', userId);
    const teacher = await this.teacherRepository.findOne({
      where: { user: { id: userId } },
      relations: ['subjects', 'schedules'],
    });
    // console.log('teacher', teacher);
    const teacherId = teacher?.id;
    const schedules = await this.scheduleRepository.find({
      where: { teacher: { id: teacherId } },
    });

    const classIds = schedules.map((s) => s.schoolClass.id);

    const students = await this.studentRepository.find({
      where: { schoolClass: { id: In(classIds) } },
    });

    return {
      // schedules,
      students,
      teacher,
    };
  }
}
