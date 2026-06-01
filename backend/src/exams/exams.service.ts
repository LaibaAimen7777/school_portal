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
import { ExamTermType } from 'src/exam-periods/entities/exam-periods.entity';

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

    const exam = this.examRepo.create({
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

    return this.examRepo.save(exam);
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

  async getExamReminders() {
    const today = new Date().toISOString().split('T')[0];

    const activePeriod = await this.examPeriodRepo
      .createQueryBuilder('ep')
      .where('ep.startDate <= :today', { today })
      .andWhere('ep.endDate >= :today', { today })
      .andWhere('ep.isActive = true')
      .getOne();

    if (!activePeriod) {
      return {
        hasActivePeriod: false,
        activePeriod: null,
        completeness: {
          totalClasses: 0,
          completeClasses: 0,
          allComplete: true,
          incompleteClasses: [],
        },
      };
    }

    // Load classes with schedules to derive subjects (no direct subjects relation on SchoolClass)
    const classes = await this.classRepo.find({
      relations: ['schedules', 'schedules.subject', 'schedules.teacher'],
    });

    // Exams already scheduled in this period
    const scheduledExams = await this.examRepo.find({
      where: { examPeriod: { id: activePeriod.id } },
      relations: ['schoolClass', 'subject'],
    });

    const scheduled = new Set(
      scheduledExams.map((e) => `${e.schoolClass.id}:${e.subject.id}`),
    );

    const incompleteClasses: {
      classId: number;
      grade: number;
      section: string;
      missingSubjects: string[];
    }[] = [];

    for (const cls of classes) {
      // Derive unique subjects from this class's schedules
      const subjectMap = new Map<number, string>();
      for (const schedule of cls.schedules ?? []) {
        if (schedule.subject)
          subjectMap.set(schedule.subject.id, schedule.subject.name);
      }
      if (subjectMap.size === 0) continue;

      const missingSubjects = [...subjectMap.entries()]
        .filter(([id]) => !scheduled.has(`${cls.id}:${id}`))
        .map(([, name]) => name);

      if (missingSubjects.length > 0) {
        incompleteClasses.push({
          classId: cls.id,
          grade: cls.grade,
          section: cls.section,
          missingSubjects,
        });
      }
    }

    const totalClasses = classes.filter((c) =>
      (c.schedules ?? []).some((s) => s.subject),
    ).length;

    return {
      hasActivePeriod: true,
      activePeriod: {
        id: activePeriod.id,
        name: activePeriod.name,
        startDate: activePeriod.startDate,
        endDate: activePeriod.endDate,
      },
      completeness: {
        totalClasses,
        completeClasses: totalClasses - incompleteClasses.length,
        allComplete: incompleteClasses.length === 0,
        incompleteClasses,
      },
    };
  }

  async autoScheduleExams(): Promise<{
    scheduled: number;
    skipped: number;
    errors: string[];
  }> {
    const today = new Date().toISOString().split('T')[0];

    const activePeriod = await this.examPeriodRepo
      .createQueryBuilder('ep')
      .where('ep.startDate <= :today', { today })
      .andWhere('ep.endDate >= :today', { today })
      .andWhere('ep.isActive = true')
      .getOne();

    if (!activePeriod)
      return {
        scheduled: 0,
        skipped: 0,
        errors: ['No active exam period found'],
      };

    const classes = await this.classRepo.find({
      relations: ['schedules', 'schedules.subject', 'schedules.teacher'],
    });
    const rooms = await this.roomRepo.find();
    const teachers = await this.teacherRepo.find({ relations: ['subjects'] });

    // Skip already-scheduled class+subject combos
    const existingExams = await this.examRepo.find({
      where: { examPeriod: { id: activePeriod.id } },
      relations: ['schoolClass', 'subject'],
    });
    const alreadyScheduled = new Set(
      existingExams.map((e) => `${e.schoolClass.id}:${e.subject.id}`),
    );

    const availableDates = getWeekdays(
      activePeriod.startDate,
      activePeriod.endDate,
    );
    if (availableDates.length === 0)
      return {
        scheduled: 0,
        skipped: 0,
        errors: ['No weekdays in exam period'],
      };

    const DEFAULT_START = '09:00';
    const DEFAULT_END = '11:00';
    const MAX_PER_DATE = 3;

    // Track how many exams are assigned per date
    const dateUsage = new Map<string, number>();
    for (const d of availableDates) dateUsage.set(d, 0);
    for (const e of existingExams) {
      dateUsage.set(e.date, (dateUsage.get(e.date) ?? 0) + 1);
    }

    let scheduled = 0;
    let skipped = 0;
    const errors: string[] = [];

    for (const cls of classes) {
      // Derive unique subjects from this class's schedules
      const subjectMap = new Map<number, { id: number; name: string }>();
      for (const schedule of cls.schedules ?? []) {
        if (schedule.subject)
          subjectMap.set(schedule.subject.id, schedule.subject);
      }
      if (subjectMap.size === 0) continue;

      for (const subject of subjectMap.values()) {
        const key = `${cls.id}:${subject.id}`;
        if (alreadyScheduled.has(key)) {
          skipped++;
          continue;
        }

        // Pick least-used date that hasn't hit the daily cap
        const date = pickDate(availableDates, dateUsage, MAX_PER_DATE);
        if (!date) {
          errors.push(
            `No available date for Grade ${cls.grade}-${cls.section} – ${subject.name}`,
          );
          skipped++;
          continue;
        }

        // Find a teacher for this subject
        const teacher = teachers.find((t) =>
          t.subjects?.some((s) => s.id === subject.id),
        );
        if (!teacher) {
          errors.push(`No teacher found for subject: ${subject.name}`);
          skipped++;
          continue;
        }

        // Find a room not already booked at the default slot on this date
        const bookedRoomIds = await this.getBookedRoomIds(
          date,
          DEFAULT_START,
          DEFAULT_END,
        );
        const room = rooms.find((r) => !bookedRoomIds.has(r.id));
        if (!room) {
          errors.push(
            `No available room on ${date} for Grade ${cls.grade}-${cls.section} – ${subject.name}`,
          );
          skipped++;
          continue;
        }

        try {
          await this.examRepo.save({
            schoolClass: { id: cls.id },
            subject: { id: subject.id },
            teacher: { id: teacher.id },
            room: { id: room.id },
            examPeriod: { id: activePeriod.id },
            date,
            startTime: DEFAULT_START,
            endTime: DEFAULT_END,
            examType: activePeriod.examType,
          });

          dateUsage.set(date, (dateUsage.get(date) ?? 0) + 1);
          alreadyScheduled.add(key);
          scheduled++;
        } catch (err: any) {
          errors.push(
            `Failed: Grade ${cls.grade}-${cls.section} – ${subject.name}: ${err.message}`,
          );
          skipped++;
        }
      }
    }

    return { scheduled, skipped, errors };
  }

  private async getBookedRoomIds(
    date: string,
    startTime: string,
    endTime: string,
  ): Promise<Set<number>> {
    const conflicts = await this.examRepo
      .createQueryBuilder('e')
      .leftJoinAndSelect('e.room', 'r')
      .where('e.date = :date', { date })
      .andWhere('e.startTime < :endTime AND e.endTime > :startTime', {
        startTime,
        endTime,
      })
      .getMany();

    return new Set(
      conflicts.map((e) => e.room?.id).filter(Boolean) as number[],
    );
  }
}

function getWeekdays(startDate: string, endDate: string): string[] {
  const dates: string[] = [];
  const cursor = new Date(startDate);
  const end = new Date(endDate);
  while (cursor <= end) {
    const day = cursor.getDay();
    if (day !== 0 && day !== 6) dates.push(cursor.toISOString().split('T')[0]);
    cursor.setDate(cursor.getDate() + 1);
  }
  return dates;
}

function pickDate(
  dates: string[],
  usage: Map<string, number>,
  max: number,
): string | null {
  const sorted = [...dates].sort(
    (a, b) => (usage.get(a) ?? 0) - (usage.get(b) ?? 0),
  );
  return sorted.find((d) => (usage.get(d) ?? 0) < max) ?? null;
}
