import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Exam } from './entities/exams.entity';
import { Repository } from 'typeorm';
import { ExamPeriod } from 'src/exam-periods/entities/exam-periods.entity';
import { SchoolClass } from 'src/school-class/entities/school-class.entity';
import { Subject } from 'src/subject/entities/subject.entity';
import { Teacher } from 'src/teachers/entities/teacher.entity';
import { Rooms } from 'src/rooms/entities/rooms.entity';
import { CreateExamDto } from './dto/create-exam.dto';

// exams/exams.service.ts
@Injectable()
export class ExamsService {
  constructor(
    @InjectRepository(Exam)
    private examRepo: Repository<Exam>,
    @InjectRepository(ExamPeriod)
    private examPeriodRepo: Repository<ExamPeriod>,
    @InjectRepository(SchoolClass)
    private classRepo: Repository<SchoolClass>,
    @InjectRepository(Subject)
    private subjectRepo: Repository<Subject>,
    @InjectRepository(Teacher)
    private teacherRepo: Repository<Teacher>,
    @InjectRepository(Rooms)
    private roomRepo: Repository<Rooms>,
  ) {}

  async createExam(dto: CreateExamDto) {
    const {
      classId,
      subjectId,
      teacherId,
      roomId,
      date,
      startTime,
      endTime,
      examType,
      examPeriodId,
    } = dto;

    // 1. Verify an exam period exists and covers this date
    const examPeriod = await this.examPeriodRepo.findOne({
      where: { id: examPeriodId, isActive: true },
    });
    if (!examPeriod) throw new NotFoundException('Exam period not found');

    if (date < examPeriod.startDate || date > examPeriod.endDate) {
      throw new BadRequestException(
        `Date ${date} is outside exam period "${examPeriod.name}" ` +
          `(${examPeriod.startDate} – ${examPeriod.endDate})`,
      );
    }

    // 2. Validate future date
    const today = new Date().toISOString().split('T')[0];
    if (date < today)
      throw new BadRequestException('Exam date must be in the future');

    // 3. Load entities
    const [schoolClass, subject, teacher, room] = await Promise.all([
      this.classRepo.findOneOrFail({ where: { id: classId } }),
      this.subjectRepo.findOneOrFail({ where: { id: subjectId } }),
      this.teacherRepo.findOneOrFail({ where: { id: teacherId } }),
      this.roomRepo.findOneOrFail({ where: { id: roomId } }),
    ]);

    // 4. Check: same class already has an exam at this time on this date
    const classConflict = await this.examRepo
      .createQueryBuilder('e')
      .where('e.schoolClassId = :classId', { classId })
      .andWhere('e.date = :date', { date })
      .andWhere('(e.startTime < :endTime AND e.endTime > :startTime)', {
        startTime,
        endTime,
      })
      .getOne();

    if (classConflict) {
      throw new BadRequestException(
        `This class already has an exam from ${classConflict.startTime} to ${classConflict.endTime} on ${date}`,
      );
    }

    // 5. Check: same room double-booked
    const roomConflict = await this.examRepo
      .createQueryBuilder('e')
      .where('e.roomId = :roomId', { roomId })
      .andWhere('e.date = :date', { date })
      .andWhere('(e.startTime < :endTime AND e.endTime > :startTime)', {
        startTime,
        endTime,
      })
      .getOne();

    if (roomConflict) {
      throw new BadRequestException(
        `Room is already booked from ${roomConflict.startTime} to ${roomConflict.endTime}`,
      );
    }

    // 6. Check: teacher double-booked
    const teacherConflict = await this.examRepo
      .createQueryBuilder('e')
      .where('e.teacherId = :teacherId', { teacherId })
      .andWhere('e.date = :date', { date })
      .andWhere('(e.startTime < :endTime AND e.endTime > :startTime)', {
        startTime,
        endTime,
      })
      .getOne();

    if (teacherConflict) {
      throw new BadRequestException(
        'Teacher is already assigned to another exam at this time',
      );
    }

    return this.examRepo.save({
      schoolClass,
      subject,
      teacher,
      room,
      examPeriod,
      date,
      startTime,
      endTime,
      examType,
    });
  }

  async getTeacherExams(teacherId: number) {
    const today = new Date().toISOString().split('T')[0];
    return this.examRepo
      .createQueryBuilder('e')
      .leftJoinAndSelect('e.subject', 's')
      .leftJoinAndSelect('e.schoolClass', 'sc')
      .leftJoinAndSelect('e.room', 'r')
      .where('e.teacherId = :teacherId', { teacherId })
      .andWhere('e.date <= :today', { today })
      .orderBy('e.date', 'DESC')
      .getMany();
  }

  async findAll() {
    return this.examRepo.find({
      relations: ['schoolClass', 'subject', 'teacher', 'room', 'examPeriod'],
      order: { date: 'ASC', startTime: 'ASC' },
    });
  }
}
