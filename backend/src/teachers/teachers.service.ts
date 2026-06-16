// src/teachers/teachers.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User, UserRole } from 'src/users/entities/user.entity';
import { DataSource, Repository, In } from 'typeorm';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { Teacher } from './entities/teacher.entity';
import { TeacherSubjectGrade } from './entities/teacher-subject-grade.entity';
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

    @InjectRepository(TeacherSubjectGrade)
    private tsgRepository: Repository<TeacherSubjectGrade>,

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
    teacher.qualification = dto.qualification ?? '';
    if (dto.hireDate) teacher.hireDate = dto.hireDate;
    teacher.user = savedUser;
    const savedTeacher = await this.teacherRepository.save(teacher);

    // Save subject+grade combos
    if (dto.subjectGrades && dto.subjectGrades.length > 0) {
      const tsgEntries = dto.subjectGrades.map((sg) =>
        this.tsgRepository.create({
          teacher: { id: savedTeacher.id },
          subject: { id: sg.subjectId },
          grade: sg.grade,
        }),
      );
      await this.tsgRepository.save(tsgEntries);
    }

    return {
      teacherId: savedTeacher.id,
      username,
      temporaryPassword: plainPassword,
    };
  }

  async findAll() {
    return this.teacherRepository.find({
      relations: ['subjectGrades', 'subjectGrades.subject', 'user'],
      order: { id: 'DESC' },
    });
  }

  /**
   * Returns teachers who can teach a specific subject in a specific grade.
   * Used by schedule and exam creation to filter the teacher dropdown.
   * Throws if no teachers qualify (blocks scheduling).
   */
  async findBySubjectAndGrade(subjectId: number, grade: number) {
    const tsgs = await this.tsgRepository.find({
      where: { subject: { id: subjectId }, grade },
      relations: ['teacher', 'teacher.user'],
    });
    return tsgs.map((tsg) => tsg.teacher);
  }

  async updateSubjectGrades(
    teacherId: number,
    subjectGrades: { subjectId: number; grade: number }[],
  ) {
    return this.dataSource.transaction(async (manager) => {
      const teacher = await manager.findOne(Teacher, {
        where: { id: teacherId },
      });

      if (!teacher) throw new NotFoundException('Teacher not found');

      await this.replaceSubjectGradesTx(manager, teacherId, subjectGrades);

      return manager.findOne(Teacher, {
        where: { id: teacherId },
        relations: ['subjectGrades', 'subjectGrades.subject'],
      });
    });
  }

  async update(
    id: number,
    dto: {
      fullName?: string;
      qualification?: string;
      subjectGrades?: { subjectId: number; grade: number }[];
    },
  ) {
    return this.dataSource.transaction(async (manager) => {
      const teacher = await manager.findOne(Teacher, {
        where: { id },
      });

      if (!teacher) throw new NotFoundException('Teacher not found');

      // ✅ update basic fields
      teacher.fullName = dto.fullName ?? teacher.fullName;
      teacher.qualification = dto.qualification ?? teacher.qualification;

      await manager.save(teacher);

      // ✅ use helper inside transaction
      if (dto.subjectGrades) {
        await this.replaceSubjectGradesTx(manager, id, dto.subjectGrades);
      }

      return manager.findOne(Teacher, {
        where: { id },
        relations: ['subjectGrades', 'subjectGrades.subject', 'user'],
      });
    });
  }

  private async replaceSubjectGradesTx(
    manager: any,
    teacherId: number,
    subjectGrades: { subjectId: number; grade: number }[],
  ) {
    await manager.delete(TeacherSubjectGrade, {
      teacher: { id: teacherId },
    });

    if (subjectGrades.length > 0) {
      const entries = subjectGrades.map((sg) =>
        manager.create(TeacherSubjectGrade, {
          teacher: { id: teacherId },
          subject: { id: sg.subjectId },
          grade: sg.grade,
        }),
      );

      await manager.save(entries);
    }
  }

  async remove(id: number) {
    const teacher = await this.teacherRepository.findOne({
      where: { id },
      relations: ['user'],
    });
    if (!teacher) throw new NotFoundException('Teacher not found');

    const userId = teacher.user?.id;

    const schedules = await this.scheduleRepository.find({
      where: { teacher: { id } },
    });
    const scheduleIds = schedules.map((s) => s.id);

    if (scheduleIds.length > 0) {
      await this.dataSource.query(
        `DELETE FROM attendance WHERE scheduleId IN (${scheduleIds.join(',')})`,
      );
      await this.scheduleRepository.delete({ teacher: { id } });
    }

    // Remove subject+grade combos
    await this.tsgRepository.delete({ teacher: { id } });

    await this.teacherRepository.remove(teacher);

    if (userId) await this.userRepository.delete(userId);

    return { message: 'Teacher deleted successfully' };
  }

  async getDashboard(userId: number) {
    const teacher = await this.teacherRepository.findOne({
      where: { user: { id: userId } },
      relations: ['subjectGrades', 'subjectGrades.subject', 'schedules'],
    });
    if (!teacher) throw new NotFoundException('Teacher not found');

    const schedules = await this.scheduleRepository.find({
      where: { teacher: { id: teacher.id } },
      relations: ['schoolClass', 'subject', 'room'],
      order: { dayOfWeek: 'ASC', startTime: 'ASC' },
    });

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

    return { teacher, schedules, students };
  }
}
