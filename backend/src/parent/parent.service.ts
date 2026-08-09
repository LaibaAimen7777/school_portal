import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Parent } from './entities/parent.entity';
import { Repository } from 'typeorm';
import { Student } from 'src/student/entities/student.entity';
import { Attendance } from 'src/attendance/entities/attendance.entity';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class ParentService {
  constructor(
    @InjectRepository(Parent)
    private parentRepository: Repository<Parent>,

    @InjectRepository(Student)
    private studentRepository: Repository<Student>,

    @InjectRepository(Attendance)
    private attendanceRepository: Repository<Attendance>,

    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findByPhone(phone: string): Promise<Parent | null> {
    const parent = await this.parentRepository.findOne({
      where: { phone },
    });

    return parent || null;
  }

  // parent.service.ts — consolidating into existing service per your preference
  async findByPhoneWithChildren(phone: string) {
    return this.parentRepository.findOne({
      where: { phone },
      relations: ['students', 'students.schoolClass'],
    });
  }

  async getPortalData(parentUserId: number) {
    const parent = await this.parentRepository.findOne({
      where: { user: { id: parentUserId } },
      relations: ['students', 'user'],
    });
    if (!parent) throw new NotFoundException('Parent not found');

    const children = await this.studentRepository.find({
      where: parent.students.map((s) => ({ id: s.id })),
      relations: [
        'schoolClass',
        // 'schoolClass.attendance',
        'schoolClass.schedules.subject',
        'schoolClass.schedules.teacher',
        'schoolClass.schedules.room',
      ],
    });

    const childrenData = await Promise.all(
      children.map(async (student) => {
        const attendanceRecords = await this.attendanceRepository.find({
          where: { student: { id: student.id } },
          relations: ['schedule', 'schedule.subject'],
          order: { date: 'DESC' },
        });

        const total = attendanceRecords.length;
        const present = attendanceRecords.filter(
          (a) => a.status === 'PRESENT',
        ).length;
        const absent = attendanceRecords.filter(
          (a) => a.status === 'ABSENT',
        ).length;

        const teacherMap = new Map<
          number,
          { id: number; fullName: string; subjects: string[] }
        >();
        for (const schedule of student.schoolClass?.schedules ?? []) {
          if (!schedule.teacher) continue;
          const existing = teacherMap.get(schedule.teacher.id);
          if (existing) {
            const subName = schedule.subject?.name;
            if (subName && !existing.subjects.includes(subName)) {
              existing.subjects.push(subName);
            }
          } else {
            teacherMap.set(schedule.teacher.id, {
              id: schedule.teacher.id,
              fullName: schedule.teacher.fullName,
              subjects: schedule.subject?.name ? [schedule.subject.name] : [],
            });
          }
        }

        return {
          id: student.id,
          firstName: student.firstName,
          lastName: student.lastName,
          rollNumber: student.rollNumber,
          schoolClass: student.schoolClass
            ? {
                id: student.schoolClass.id,
                grade: student.schoolClass.grade,
                section: student.schoolClass.section,
              }
            : null,

          schedule: (student.schoolClass?.schedules ?? []).map((s) => ({
            id: s.id,
            dayOfWeek: s.dayOfWeek,
            startTime: s.startTime,
            endTime: s.endTime,
            subject: s.subject?.name ?? null,
            teacher: s.teacher?.fullName ?? null,
            room: s.room?.name ?? null,
          })),

          teachers: Array.from(teacherMap.values()),

          attendance: {
            total,
            present,
            absent,
            // No LATE status in the entity — kept clean
            percentage: total > 0 ? Math.round((present / total) * 100) : null,
            recent: attendanceRecords.slice(0, 20).map((a) => ({
              date: a.date,
              status: a.status,
              subject: a.schedule?.subject?.name ?? null,
            })),
          },
        };
      }),
    );

    return {
      parent: {
        id: parent.id,
        fatherName: parent.fatherName,
        motherName: parent.motherName,
        phone: parent.phone,
        email: parent.email,
      },
      children: childrenData,
      mustChangePassword: parent.user?.must_change_password ?? false,
    };
  }

  async resetParentPassword(parentId: number) {
    // const parent = await this.userRepository.findOne({
    //   where: { id: parentId },
    //   relations: ['parent'],
    // });
    const parent = await this.parentRepository.findOne({
      where: { id: parentId },
      relations: ['user'],
    });

    console.log(parentId);
    console.log('parent', parent);

    if (!parent) {
      throw new NotFoundException('Parent not found');
    }

    if (!parent.user) {
      throw new BadRequestException('User not found');
    }

    const newPassword = crypto.randomBytes(8).toString('hex');

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    parent.user.password = hashedPassword;
    parent.user.must_change_password = true;
    parent.user.can_login = true;
    parent.user.is_active = true;

    await this.userRepository.save(parent.user);

    return {
      message: 'Password reset successfully',
      username: parent.user.username,
      temporaryPassword: newPassword,
    };
  }

  async findAll() {
    return this.parentRepository.find({
      relations: ['students', 'students.schoolClass', 'user'],
    });
  }

  async changePassword(userId: number, password: string) {
    const parent = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['parent'],
    });

    if (!parent) {
      throw new NotFoundException('Parent not found');
    }

    if (!parent.parent) {
      throw new NotFoundException('parent not found');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    parent.password = hashedPassword;
    parent.must_change_password = false;

    await this.userRepository.save(parent);

    return {
      success: true,
      message: 'Password changed successfully',
    };
  }
}
