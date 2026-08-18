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
import { TeacherSubjectGrade } from 'src/teachers/entities/teacher-subject-grade.entity';
import { Subject } from 'src/subject/entities/subject.entity';
import { SchoolClass } from 'src/school-class/entities/school-class.entity';
import { Rooms } from 'src/rooms/entities/rooms.entity';
import { SchoolConfig } from 'src/school-config/entities/school-config.entity';
import { GradeScheduleOverride } from 'src/grade_schedule_override/entities/gradeSchedule.entity';

const DAYS = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY'];

type TimeSlot = { startTime: string; endTime: string };

@Injectable()
export class ScheduleService {
  constructor(
    @InjectRepository(Schedule)
    private scheduleRepo: Repository<Schedule>,
    @InjectRepository(Teacher)
    private teacherRepo: Repository<Teacher>,
    @InjectRepository(TeacherSubjectGrade)
    private tsgRepo: Repository<TeacherSubjectGrade>,
    @InjectRepository(Subject)
    private subjectRepo: Repository<Subject>,
    @InjectRepository(SchoolClass)
    private classRepo: Repository<SchoolClass>,
    @InjectRepository(Rooms)
    private roomRepo: Repository<Rooms>,
    @InjectRepository(SchoolConfig)
    private schoolConfigRepo: Repository<SchoolConfig>,
    @InjectRepository(GradeScheduleOverride)
    private gradeOverrideRepo: Repository<GradeScheduleOverride>,
  ) {}

  // ─── helpers ────────────────────────────────────────────────────────────────

  private toMins(t: string): number {
    const [h, m] = t.split(':').map(Number);
    return h * 60 + m;
  }

  private toTime(mins: number): string {
    return `${Math.floor(mins / 60)
      .toString()
      .padStart(2, '0')}:${(mins % 60).toString().padStart(2, '0')}`;
  }

  /**
   * Generates the actual time slots for a given end time, respecting
   * the "break only after breakAfterPeriod periods" rule.
   */
  private generateTimeSlots(
    config: SchoolConfig,
    endTimeOverride?: string,
  ): TimeSlot[] {
    const startMins = this.toMins(config.schoolStartTime);
    const endMins = this.toMins(endTimeOverride ?? config.schoolEndTime);
    const slots: TimeSlot[] = [];
    let cursor = startMins;
    let periodNum = 1;

    while (cursor + config.periodDurationMinutes <= endMins) {
      const slotEnd = cursor + config.periodDurationMinutes;
      slots.push({
        startTime: this.toTime(cursor),
        endTime: this.toTime(slotEnd),
      });

      // Break appears only once — after the designated period
      if (periodNum === config.breakAfterPeriod) {
        cursor = slotEnd + config.breakDurationMinutes;
      } else {
        cursor = slotEnd;
      }
      periodNum++;
    }

    return slots;
  }

  /**
   * Resolves the effective end time for a grade on a specific day,
   * walking the fallback chain:
   *   grade friday override → global friday → grade regular override → school default
   */
  private resolveEndTime(
    grade: number,
    day: string,
    config: SchoolConfig,
    overrides: GradeScheduleOverride[],
  ): string {
    const override = overrides.find((o) => o.grade === grade);
    const isFriday = day === 'FRIDAY';

    if (isFriday) {
      return (
        override?.fridayEndTime ??
        config.fridayEndTime ??
        override?.endTime ??
        config.schoolEndTime
      );
    }

    return override?.endTime ?? config.schoolEndTime;
  }

  /**
   * Returns valid time slots for a specific grade+day combination.
   * All grades share the same start time and period duration — lower grades
   * simply get fewer slots because they're dismissed earlier.
   */
  private getSlotsForGrade(
    grade: number,
    day: string,
    config: SchoolConfig,
    overrides: GradeScheduleOverride[],
  ): TimeSlot[] {
    const endTime = this.resolveEndTime(grade, day, config, overrides);
    return this.generateTimeSlots(config, endTime);
  }

  // ─── existing methods (unchanged) ───────────────────────────────────────────

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
      relations: ['subjectGrades', 'subjectGrades.subject'],
    });
    if (!teacher) throw new NotFoundException('Teacher not found');

    const room = await this.roomRepo.findOne({ where: { id: roomId } });
    if (!room) throw new NotFoundException('Room not found');

    const qualified = teacher.subjectGrades.some(
      (tsg) => tsg.subject.id === subjectId && tsg.grade === schoolClass.grade,
    );
    if (!qualified)
      throw new BadRequestException(
        `Teacher is not assigned to teach this subject for Grade ${schoolClass.grade}`,
      );

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

  async remove(id: number) {
    const schedule = await this.scheduleRepo.findOne({ where: { id } });
    if (!schedule) throw new NotFoundException('Schedule not found');
    await this.scheduleRepo.remove(schedule);
    return { message: 'Schedule deleted successfully' };
  }

  async getCompletenessReport() {
    const allClasses = await this.classRepo.find();
    const allSubjects = await this.subjectRepo.find({
      where: { isActive: true },
    });

    const report = await Promise.all(
      allClasses.map(async (schoolClass) => {
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

  async getTeacherWorkloadReport() {
    const teachers = await this.teacherRepo.find({
      relations: ['subjectGrades', 'subjectGrades.subject'],
    });
    const allSubjects = await this.subjectRepo.find();

    const report = await Promise.all(
      teachers.map(async (teacher) => {
        const scheduleCount = await this.scheduleRepo.count({
          where: { teacher: { id: teacher.id } },
        });

        return {
          teacherId: teacher.id,
          teacherName: teacher.fullName,
          subjects: teacher.subjectGrades.map(
            (tsg) => `${tsg.subject.name} (G${tsg.grade})`,
          ),
          weeklyPeriods: scheduleCount,
          overloaded: scheduleCount > 25,
        };
      }),
    );

    const coveredSubjectIds = new Set(
      teachers.flatMap((t) =>
        t.subjectGrades
          .filter((tsg) => tsg.subject.isActive)
          .map((tsg) => tsg.subject.id),
      ),
    );

    const uncoveredSubjects = allSubjects
      .filter((s) => s && s.id && !coveredSubjectIds.has(s.id) && s.isActive)
      .map((s) => s.name);

    return {
      overloadedTeachers: report.filter((r) => r.overloaded),
      uncoveredSubjects,
      teacherDetails: report,
    };
  }

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

  // ─── auto-scheduler ──────────────────────────────────────────────────────────

  async autoSchedule(): Promise<{
    scheduled: number;
    skipped: number;
    errors: string[];
  }> {
    const [
      allClasses,
      allSubjects,
      allTeachers,
      allRooms,
      existingSchedules,
      gradeOverrides,
    ] = await Promise.all([
      this.classRepo.find(),
      this.subjectRepo.find({ where: { isActive: true } }),
      this.teacherRepo.find({
        relations: ['subjectGrades', 'subjectGrades.subject'],
      }),
      this.roomRepo.find(),
      this.scheduleRepo.find({
        relations: ['schoolClass', 'subject', 'teacher', 'room'],
      }),
      this.gradeOverrideRepo.find(),
    ]);

    const config = await this.schoolConfigRepo.findOne({ where: { id: 1 } });
    if (!config)
      throw new BadRequestException(
        'School config not found. Set it up first.',
      );

    // ── in-memory conflict sets ────────────────────────────────────────────────
    // Keys use actual start times, not slot indices, so they work correctly
    // across grades that may have different numbers of valid slots.
    // Format: `${day}-${startTime}-${entityId}`
    const bookedTeachers = new Set<string>();
    const bookedRooms = new Set<string>();
    const bookedClasses = new Set<string>();
    const classSubjectPerDay = new Set<string>(); // prevent same subject twice in one day

    for (const s of existingSchedules) {
      const startTime = s.startTime.substring(0, 5);
      const day = s.dayOfWeek;
      bookedTeachers.add(`${day}-${startTime}-${s.teacher.id}`);
      bookedRooms.add(`${day}-${startTime}-${s.room.id}`);
      bookedClasses.add(`${day}-${startTime}-${s.schoolClass.id}`);
      classSubjectPerDay.add(`${day}-${s.schoolClass.id}-${s.subject.id}`);
    }

    const teacherPeriodCount: Record<number, number> = {};
    for (const t of allTeachers) teacherPeriodCount[t.id] = 0;
    for (const s of existingSchedules)
      teacherPeriodCount[s.teacher.id] =
        (teacherPeriodCount[s.teacher.id] || 0) + 1;

    // ── build task list ────────────────────────────────────────────────────────
    // Each task is one period that still needs to be placed.
    const tasks: {
      schoolClass: (typeof allClasses)[0];
      subject: (typeof allSubjects)[0];
    }[] = [];

    for (const schoolClass of allClasses) {
      const scheduledCountPerSubject: Record<number, number> = {};
      for (const s of existingSchedules.filter(
        (s) => s.schoolClass.id === schoolClass.id,
      )) {
        scheduledCountPerSubject[s.subject.id] =
          (scheduledCountPerSubject[s.subject.id] || 0) + 1;
      }

      const gradeSubjects = allSubjects.filter((s) =>
        s.grades.map(Number).includes(schoolClass.grade),
      );

      for (const subject of gradeSubjects) {
        const periodsNeeded = subject.periodsPerWeek ?? 5;
        const alreadyScheduled = scheduledCountPerSubject[subject.id] || 0;
        const remaining = periodsNeeded - alreadyScheduled;
        for (let i = 0; i < remaining; i++) {
          tasks.push({ schoolClass, subject });
        }
      }
    }

    // ── capacity check ─────────────────────────────────────────────────────────
    // Warn if a grade needs more periods than it has slots across the whole week,
    // accounting for its actual dismissal times (including Friday).
    const errors: string[] = [];

    for (const schoolClass of allClasses) {
      const totalSlotsForGrade = DAYS.reduce((sum, day) => {
        return (
          sum +
          this.getSlotsForGrade(schoolClass.grade, day, config, gradeOverrides)
            .length
        );
      }, 0);

      const gradeSubjects = allSubjects.filter((s) =>
        s.grades.map(Number).includes(schoolClass.grade),
      );
      const totalPeriodsNeeded = gradeSubjects.reduce(
        (sum, s) => sum + (s.periodsPerWeek ?? 5),
        0,
      );

      if (totalPeriodsNeeded > totalSlotsForGrade) {
        errors.push(
          `Grade ${schoolClass.grade}-${schoolClass.section} needs ${totalPeriodsNeeded} periods/week ` +
            `but only ${totalSlotsForGrade} slots are available (check dismissal times in school config).`,
        );
      }
    }

    // ── shuffle for variety ────────────────────────────────────────────────────
    for (let i = tasks.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [tasks[i], tasks[j]] = [tasks[j], tasks[i]];
    }

    // ── placement loop ─────────────────────────────────────────────────────────
    let scheduled = 0;
    let skipped = 0;

    for (const { schoolClass, subject } of tasks) {
      const eligibleTeachers = allTeachers
        .filter((t) =>
          t.subjectGrades.some(
            (tsg) =>
              tsg.subject.id === subject.id && tsg.grade === schoolClass.grade,
          ),
        )
        .sort(
          (a, b) =>
            (teacherPeriodCount[a.id] || 0) - (teacherPeriodCount[b.id] || 0),
        );

      if (eligibleTeachers.length === 0) {
        errors.push(
          `No teacher for "${subject.name}" at Grade ${schoolClass.grade} — ` +
            `skipping Grade ${schoolClass.grade}-${schoolClass.section}`,
        );
        skipped++;
        continue;
      }

      // Prefer days with fewer periods already assigned to this class
      const classPeriodsPerDay: Record<string, number> = {};
      for (const day of DAYS) {
        classPeriodsPerDay[day] = [...bookedClasses].filter(
          (k) => k.startsWith(`${day}-`) && k.endsWith(`-${schoolClass.id}`),
        ).length;
      }
      const sortedDays = [...DAYS].sort(
        (a, b) => classPeriodsPerDay[a] - classPeriodsPerDay[b],
      );

      let placed = false;

      for (const day of sortedDays) {
        if (placed) break;

        // ← KEY CHANGE: get slots valid for THIS grade on THIS day
        const slots = this.getSlotsForGrade(
          schoolClass.grade,
          day,
          config,
          gradeOverrides,
        );

        // Shuffle slot order for variety
        const slotOrder = [...Array(slots.length).keys()];
        for (let i = slotOrder.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [slotOrder[i], slotOrder[j]] = [slotOrder[j], slotOrder[i]];
        }

        for (const slotIdx of slotOrder) {
          if (placed) break;
          const slot = slots[slotIdx];

          const classKey = `${day}-${slot.startTime}-${schoolClass.id}`;
          if (bookedClasses.has(classKey)) continue;

          const subjectKey = `${day}-${schoolClass.id}-${subject.id}`;
          if (classSubjectPerDay.has(subjectKey)) continue;

          for (const teacher of eligibleTeachers) {
            const teacherKey = `${day}-${slot.startTime}-${teacher.id}`;
            if (bookedTeachers.has(teacherKey)) continue;

            const freeRoom = allRooms.find(
              (r) => !bookedRooms.has(`${day}-${slot.startTime}-${r.id}`),
            );
            if (!freeRoom) continue;

            try {
              const newSchedule = this.scheduleRepo.create({
                schoolClass,
                subject,
                teacher,
                room: freeRoom,
                dayOfWeek: day,
                startTime: slot.startTime,
                endTime: slot.endTime,
              });
              await this.scheduleRepo.save(newSchedule);

              bookedTeachers.add(teacherKey);
              bookedRooms.add(`${day}-${slot.startTime}-${freeRoom.id}`);
              bookedClasses.add(classKey);
              teacherPeriodCount[teacher.id]++;
              classSubjectPerDay.add(subjectKey);
              scheduled++;
              placed = true;
              break;
            } catch {
              // DB-level conflict — try next option
            }
          }
        }
      }

      if (!placed) {
        errors.push(
          `Could not place a slot for "${subject.name}" in ` +
            `Grade ${schoolClass.grade}-${schoolClass.section} — week is full`,
        );
        skipped++;
      }
    }

    return { scheduled, skipped, errors };
  }

  async clearAndAutoSchedule(): Promise<{
    cleared: number;
    scheduled: number;
    skipped: number;
    errors: string[];
  }> {
    const existing = await this.scheduleRepo.find();
    await this.scheduleRepo.remove(existing);
    const cleared = existing.length;
    const result = await this.autoSchedule();
    return { cleared, ...result };
  }
}
