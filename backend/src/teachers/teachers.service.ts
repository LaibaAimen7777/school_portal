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
    const lastUser = await this.userRepository
      .createQueryBuilder('u')
      .where('u.username LIKE :pattern', { pattern: 'TCH%' })
      .orderBy('u.username', 'DESC')
      .getOne();

    const lastNum = lastUser
      ? parseInt(lastUser.username.replace('TCH', ''))
      : 0;

    const nextNum = lastNum + 1;
    const username = `TCH${nextNum.toString().padStart(3, '0')}`;
    const teacherCode = `T-${nextNum.toString().padStart(3, '0')}`;
    const plainPassword = generatePassword();
    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    const user = new User();
    user.username = username;
    user.password = hashedPassword;
    user.role = UserRole.TEACHER;
    user.can_login = true;
    user.must_change_password = true;
    user.is_active = true;
    const savedUser = await this.userRepository.save(user);

    const teacher = new Teacher();
    teacher.teacherCode = teacherCode;
    teacher.fullName = dto.fullName;
    teacher.qualification = dto.qualification;
    if (dto.hireDate) teacher.hireDate = dto.hireDate;
    teacher.user = savedUser;
    const savedTeacher = await this.teacherRepository.save(teacher);

    const debug: any = {
      teacherId: savedTeacher.id,
      subjectIdsReceived: dto.subjectIds,
      subjectsFoundCount: 0,
      junctionInserts: [],
      junctionTableAfter: [],
    };

    if (dto.subjectIds && dto.subjectIds.length > 0) {
      const subjects = await this.subjectRepository.findBy({
        id: In(dto.subjectIds),
      });

      debug.subjectsFoundCount = subjects.length;
      debug.subjectsFound = subjects.map((s) => ({ id: s.id, name: s.name }));

      for (const subject of subjects) {
        const insertResult = await this.dataSource.query(
          `INSERT IGNORE INTO teachers_subjects_subjects (teachersId, subjectsId) VALUES (?, ?)`,
          [savedTeacher.id, subject.id],
        );
        debug.junctionInserts.push({
          teacherId: savedTeacher.id,
          subjectId: subject.id,
          affectedRows: insertResult.affectedRows,
        });
      }

      // Read back to confirm
      debug.junctionTableAfter = await this.dataSource.query(
        `SELECT * FROM teachers_subjects_subjects WHERE teachersId = ?`,
        [savedTeacher.id],
      );
    }

    return {
      teacherId: savedTeacher.id,
      username,
      temporaryPassword: plainPassword,
      debug, // ✅ visible in API response
    };
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

    const userId = teacher.user?.id;

    // 1. Delete attendance records linked to this teacher's schedules
    const schedules = await this.scheduleRepository.find({
      where: { teacher: { id } },
    });
    const scheduleIds = schedules.map((s) => s.id);

    if (scheduleIds.length > 0) {
      await this.dataSource.query(
        `DELETE FROM attendance WHERE scheduleId IN (${scheduleIds.join(',')})`,
      );
      // 2. Delete the schedules
      await this.scheduleRepository.delete({ teacher: { id } });
    }

    // 3. Delete junction table entries
    await this.dataSource.query(
      `DELETE FROM teachers_subjects_subjects WHERE teachersId = ?`,
      [id],
    );

    // 4. Delete teacher
    await this.teacherRepository.remove(teacher);

    // 5. Delete user
    if (userId) {
      await this.userRepository.delete(userId);
    }

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
