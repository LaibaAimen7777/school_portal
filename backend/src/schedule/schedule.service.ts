// src/schedule/schedule.service.ts
import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Schedule } from './entities/schedule.entity';
import { Repository } from 'typeorm';
import { Teacher } from 'src/teachers/entities/teacher.entity';
import { Subject } from 'src/subject/entities/subject.entity';
import { SchoolClass } from 'src/school-class/entities/school-class.entity';
import { Rooms } from 'src/rooms/entities/rooms.entity';
import { SchoolConfig } from 'src/school-config/entities/school-config.entity';

const DAYS = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY'];

@Injectable()
export class ScheduleService {
  constructor(
    @InjectRepository(Schedule)
    private scheduleRepo: Repository<Schedule>,
    @InjectRepository(Teacher)
    private teacherRepo: Repository<Teacher>,
    @InjectRepository(Subject)
    private subjectRepo: Repository<Subject>,
    @InjectRepository(SchoolClass)
    private classRepo: Repository<SchoolClass>,
    @InjectRepository(Rooms)
    private roomRepo: Repository<Rooms>,
    @InjectRepository(SchoolConfig)
    private schoolConfigRepo: Repository<SchoolConfig>,
  ) {}

  async create(createScheduleDto: CreateScheduleDto) {
    const {
      classId,
      subjectId,
      teacherId,
      roomId,
      dayOfWeek,
      startTime,
      endTime,
    } = createScheduleDto;

    const schoolClass = await this.classRepo.findOne({
      where: { id: classId },
    });
    if (!schoolClass) throw new NotFoundException('Class not found');

    const subject = await this.subjectRepo.findOne({
      where: { id: subjectId },
    });
    if (!subject) throw new NotFoundException('Subject not found');

    const teacher = await this.teacherRepo.findOne({
      where: { id: teacherId },
      relations: ['subjects'],
    });
    if (!teacher) throw new NotFoundException('Teacher not found');

    const room = await this.roomRepo.findOne({ where: { id: roomId } });
    if (!room) throw new NotFoundException('Room not found');

    const teachesSubject = teacher.subjects.some((sub) => sub.id === subjectId);
    if (!teachesSubject)
      throw new BadRequestException('Teacher is not assigned to this subject');

    // ✅ Fix: was 'schedule.room' — must be 'schedule.roomId'
    await this.checkConflicts({
      teacherId,
      classId,
      roomId,
      dayOfWeek,
      startTime,
      endTime,
    });

    const schedule = this.scheduleRepo.create({
      schoolClass,
      subject,
      teacher,
      room,
      dayOfWeek,
      startTime,
      endTime,
    });

    return this.scheduleRepo.save(schedule);
  }

  // Extracted so auto-scheduler can reuse it
  private async checkConflicts({
    teacherId,
    classId,
    roomId,
    dayOfWeek,
    startTime,
    endTime,
    excludeId,
  }: {
    teacherId: number;
    classId: number;
    roomId: number;
    dayOfWeek: string;
    startTime: string;
    endTime: string;
    excludeId?: number;
  }) {
    const overlap = '(s.startTime < :endTime AND s.endTime > :startTime)';
    const params = { startTime, endTime };

    const teacherQ = this.scheduleRepo
      .createQueryBuilder('s')
      .where('s.teacherId = :teacherId', { teacherId })
      .andWhere('s.dayOfWeek = :dayOfWeek', { dayOfWeek })
      .andWhere(overlap, params);
    if (excludeId) teacherQ.andWhere('s.id != :excludeId', { excludeId });
    if (await teacherQ.getOne())
      throw new BadRequestException(
        'Teacher already has a class during this time',
      );

    const classQ = this.scheduleRepo
      .createQueryBuilder('s')
      .where('s.schoolClassId = :classId', { classId })
      .andWhere('s.dayOfWeek = :dayOfWeek', { dayOfWeek })
      .andWhere(overlap, params);
    if (excludeId) classQ.andWhere('s.id != :excludeId', { excludeId });
    const classConflict = await classQ.getOne();
    if (classConflict)
      throw new BadRequestException(
        `Class already has a schedule from ${classConflict.startTime} to ${classConflict.endTime} on this day`,
      );

    // ✅ Fix: was 'schedule.room = :roomId' which never matched
    const roomQ = this.scheduleRepo
      .createQueryBuilder('s')
      .where('s.roomId = :roomId', { roomId })
      .andWhere('s.dayOfWeek = :dayOfWeek', { dayOfWeek })
      .andWhere(overlap, params);
    if (excludeId) roomQ.andWhere('s.id != :excludeId', { excludeId });
    if (await roomQ.getOne())
      throw new BadRequestException('Room is already booked at this time');
  }

  async findAll() {
    return this.scheduleRepo.find({
      relations: ['teacher', 'subject', 'schoolClass', 'room'],
      order: { dayOfWeek: 'ASC', startTime: 'ASC' },
    });
  }

  // ✅ New: delete endpoint for conflict resolution screen
  async remove(id: number) {
    const schedule = await this.scheduleRepo.findOne({ where: { id } });
    if (!schedule) throw new NotFoundException('Schedule not found');
    await this.scheduleRepo.remove(schedule);
    return { message: 'Schedule deleted successfully' };
  }

  // In schedule.service.ts — replace getCompletenessReport()
  async getCompletenessReport() {
    const allClasses = await this.classRepo.find();
    const allSubjects = await this.subjectRepo.find({
      where: { isActive: true },
    });

    const report = await Promise.all(
      allClasses.map(async (schoolClass) => {
        // ✅ Only subjects that belong to this class's grade
        const gradeSubjects = allSubjects.filter((s) =>
          s.grades.includes(schoolClass.grade),
        );

        const scheduled = await this.scheduleRepo.find({
          where: { schoolClass: { id: schoolClass.id } },
          relations: ['subject'],
        });

        const scheduledSubjectIds = new Set(scheduled.map((s) => s.subject.id));
        const missingSubjects = gradeSubjects.filter(
          (sub) => !scheduledSubjectIds.has(sub.id),
        );

        return {
          classId: schoolClass.id,
          grade: schoolClass.grade,
          section: schoolClass.section,
          totalSubjects: gradeSubjects.length,
          scheduledSubjects: scheduledSubjectIds.size,
          missingSubjects: missingSubjects.map((s) => s.name),
          complete: missingSubjects.length === 0,
        };
      }),
    );

    return {
      totalClasses: allClasses.length,
      completeClasses: report.filter((r) => r.complete).length,
      incompleteClasses: report.filter((r) => !r.complete),
      allComplete: report.every((r) => r.complete),
    };
  }

  // ✅ Teacher workload report for dashboard reminders
  async getTeacherWorkloadReport() {
    const teachers = await this.teacherRepo.find({ relations: ['subjects'] });
    const allSubjects = await this.subjectRepo.find();

    const report = await Promise.all(
      teachers.map(async (teacher) => {
        const scheduleCount = await this.scheduleRepo.count({
          where: { teacher: { id: teacher.id } },
        });

        return {
          teacherId: teacher.id,
          teacherName: teacher.fullName,
          subjects: teacher.subjects.map((s) => s.name),
          weeklyPeriods: scheduleCount,
          overloaded: scheduleCount > 25, // flag if > 25 periods/week
        };
      }),
    );

    // Find subjects with no teacher assigned
    const coveredSubjectIds = new Set(
      teachers.flatMap((t) => t.subjects.map((s) => s.id)),
    );
    const uncoveredSubjects = allSubjects
      .filter((s) => !coveredSubjectIds.has(s.id))
      .map((s) => s.name);

    return {
      overloadedTeachers: report.filter((r) => r.overloaded),
      uncoveredSubjects,
      teacherDetails: report,
    };
  }

  // ✅ Combined dashboard reminders — single endpoint
  async getDashboardReminders() {
    const [completeness, workload] = await Promise.all([
      this.getCompletenessReport(),
      this.getTeacherWorkloadReport(),
    ]);

    const reminders: {
      type: 'warning' | 'error';
      message: string;
      link?: string;
    }[] = [];

    if (!completeness.allComplete) {
      reminders.push({
        type: 'warning',
        message: `${completeness.incompleteClasses.length} class(es) have missing subject schedules`,
        link: '/dashboard/admin/schedule',
      });
    }

    if (workload.uncoveredSubjects.length > 0) {
      reminders.push({
        type: 'error',
        message: `No teacher assigned for: ${workload.uncoveredSubjects.join(', ')}`,
        link: '/dashboard/admin/create-teacher',
      });
    }

    if (workload.overloadedTeachers.length > 0) {
      reminders.push({
        type: 'warning',
        message: `${workload.overloadedTeachers.length} teacher(s) have over 25 periods/week — consider hiring`,
        link: '/dashboard/admin/create-teacher',
      });
    }

    return { reminders, completeness, workload };
  }

  async autoSchedule(): Promise<{
    scheduled: number;
    skipped: number;
    errors: string[];
  }> {
    const [allClasses, allSubjects, allTeachers, allRooms, existingSchedules] =
      await Promise.all([
        this.classRepo.find(),
        this.subjectRepo.find(),
        this.teacherRepo.find({ relations: ['subjects'] }),
        this.roomRepo.find(),
        this.scheduleRepo.find({
          relations: ['schoolClass', 'subject', 'teacher', 'room'],
        }),
      ]);

    const config = await this.schoolConfigRepo.findOne({ where: { id: 1 } });
    if (!config)
      throw new BadRequestException(
        'School config not found. Set it up first.',
      );

    const [startHour, startMin] = config.schoolStartTime.split(':').map(Number);
    const [endHour, endMin] = config.schoolEndTime.split(':').map(Number);
    const START_MINS = startHour * 60 + startMin;
    const END_MINS = endHour * 60 + endMin;
    const PERIOD_MINS = config.periodDurationMinutes;
    const BREAK_MINS = config.breakDurationMinutes;

    // Generate slots as "HH:MM-HH:MM" strings
    const slots: string[] = [];
    let cursor = START_MINS;
    while (cursor < END_MINS) {
      const slotEnd = cursor + PERIOD_MINS;
      if (slotEnd > END_MINS) break;
      const sh = Math.floor(cursor / 60)
        .toString()
        .padStart(2, '0');
      const sm = (cursor % 60).toString().padStart(2, '0');
      const eh = Math.floor(slotEnd / 60)
        .toString()
        .padStart(2, '0');
      const em = (slotEnd % 60).toString().padStart(2, '0');
      slots.push(`${sh}:${sm}-${eh}:${em}`);
      cursor += PERIOD_MINS + BREAK_MINS;
    }

    // Booked state sets
    const bookedTeachers = new Set<string>();
    const bookedRooms = new Set<string>();
    const bookedClasses = new Set<string>();

    // Seed from existing schedules
    for (const s of existingSchedules) {
      const slotKey = slots.findIndex((slot) => {
        const [slotStart] = slot.split('-');
        return slotStart === s.startTime.substring(0, 5);
      });
      if (slotKey === -1) continue;
      bookedTeachers.add(`${s.dayOfWeek}-${slotKey}-${s.teacher.id}`);
      bookedRooms.add(`${s.dayOfWeek}-${slotKey}-${s.room.id}`);
      bookedClasses.add(`${s.dayOfWeek}-${slotKey}-${s.schoolClass.id}`);
    }

    const teacherPeriodCount: Record<number, number> = {};
    for (const t of allTeachers) teacherPeriodCount[t.id] = 0;
    for (const s of existingSchedules)
      teacherPeriodCount[s.teacher.id] =
        (teacherPeriodCount[s.teacher.id] || 0) + 1;

    let scheduled = 0;
    let skipped = 0;
    const errors: string[] = [];

    // ✅ Key fix: build a flat list of all (class, subject) pairs needed
    // then shuffle day order per pair so load spreads across the week
    const tasks: {
      schoolClass: (typeof allClasses)[0];
      subject: (typeof allSubjects)[0];
    }[] = [];

    for (const schoolClass of allClasses) {
      const alreadyScheduled = existingSchedules
        .filter((s) => s.schoolClass.id === schoolClass.id)
        .map((s) => s.subject.id);

      // ✅ Only subjects for this class's grade
      const gradeSubjects = allSubjects.filter((s) =>
        s.grades.includes(schoolClass.grade),
      );

      const neededSubjects = gradeSubjects.filter(
        (sub) => !alreadyScheduled.includes(sub.id),
      );

      for (const subject of neededSubjects) {
        tasks.push({ schoolClass, subject });
      }
    }

    // ✅ Shuffle tasks so we don't fill one class completely before moving to next
    for (let i = tasks.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [tasks[i], tasks[j]] = [tasks[j], tasks[i]];
    }

    for (const { schoolClass, subject } of tasks) {
      const eligibleTeachers = allTeachers
        .filter((t) => t.subjects.some((s) => s.id === subject.id))
        .sort(
          (a, b) =>
            (teacherPeriodCount[a.id] || 0) - (teacherPeriodCount[b.id] || 0),
        );

      if (eligibleTeachers.length === 0) {
        errors.push(
          `No teacher for "${subject.name}" (Class ${schoolClass.grade}-${schoolClass.section})`,
        );
        skipped++;
        continue;
      }

      let placed = false;

      // ✅ Rotate day order based on how many slots class already has per day
      // so subjects spread evenly across the week instead of piling on Monday
      const classScheduleCountPerDay: Record<string, number> = {};
      for (const day of DAYS) {
        classScheduleCountPerDay[day] = [...bookedClasses].filter(
          (k) => k.startsWith(`${day}-`) && k.endsWith(`-${schoolClass.id}`),
        ).length;
      }

      const sortedDays = [...DAYS].sort(
        (a, b) => classScheduleCountPerDay[a] - classScheduleCountPerDay[b],
      );

      for (const day of sortedDays) {
        if (placed) break;

        for (let slotIdx = 0; slotIdx < slots.length; slotIdx++) {
          if (placed) break;

          const classKey = `${day}-${slotIdx}-${schoolClass.id}`;
          if (bookedClasses.has(classKey)) continue;

          for (const teacher of eligibleTeachers) {
            const teacherKey = `${day}-${slotIdx}-${teacher.id}`;
            if (bookedTeachers.has(teacherKey)) continue;

            const freeRoom = allRooms.find(
              (r) => !bookedRooms.has(`${day}-${slotIdx}-${r.id}`),
            );
            if (!freeRoom) continue;

            const [startTime, endTime] = slots[slotIdx].split('-');

            try {
              const newSchedule = this.scheduleRepo.create({
                schoolClass,
                subject,
                teacher,
                room: freeRoom,
                dayOfWeek: day,
                startTime,
                endTime,
              });
              await this.scheduleRepo.save(newSchedule);

              bookedTeachers.add(teacherKey);
              bookedRooms.add(`${day}-${slotIdx}-${freeRoom.id}`);
              bookedClasses.add(classKey);
              teacherPeriodCount[teacher.id]++;
              scheduled++;
              placed = true;
              break;
            } catch {
              // DB conflict — skip
            }
          }
        }
      }

      if (!placed) {
        errors.push(
          `Could not place "${subject.name}" for Class ${schoolClass.grade}-${schoolClass.section} — no free slot`,
        );
        skipped++;
      }
    }

    return { scheduled, skipped, errors };
  }

  // ✅ New: clear all auto-generated schedules so admin can re-run
  async clearAndAutoSchedule(): Promise<{
    cleared: number;
    scheduled: number;
    skipped: number;
    errors: string[];
  }> {
    // Delete all existing schedules first
    const existing = await this.scheduleRepo.find();
    await this.scheduleRepo.remove(existing);
    const cleared = existing.length;

    const result = await this.autoSchedule();
    return { cleared, ...result };
  }
}
