// exam-periods/exam-periods.service.ts
import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  ExamPeriod,
  ExamTermType,
  TERM_DEFAULT_DURATIONS,
} from './entities/exam-periods.entity';
import { Repository } from 'typeorm';
import { Schedule } from 'src/schedule/entities/schedule.entity';
import { CreateExamPeriodDto } from './dto/create-exam-period.dto';

@Injectable()
export class ExamPeriodsService {
  constructor(
    @InjectRepository(ExamPeriod)
    private examPeriodRepo: Repository<ExamPeriod>,
    @InjectRepository(Schedule)
    private scheduleRepo: Repository<Schedule>,
  ) {}

  async create(dto: CreateExamPeriodDto) {
    const { startDate, endDate, examType } = dto;

    // Prevent two periods of the same term type overlapping
    const overlap = await this.examPeriodRepo
      .createQueryBuilder('ep')
      .where('ep.startDate <= :endDate AND ep.endDate >= :startDate', {
        startDate,
        endDate,
      })
      .getOne();

    if (overlap) {
      throw new BadRequestException(
        `Overlaps with existing exam period: "${overlap.name}"`,
      );
    }

    // Use provided duration or fall back to the term default
    const durationMinutes =
      dto.durationMinutes ?? TERM_DEFAULT_DURATIONS[examType];

    return this.examPeriodRepo.save({
      name: dto.name,
      examType,
      durationMinutes,
      startDate,
      endDate,
      isActive: true,
    });
  }

  async findAll() {
    return this.examPeriodRepo.find({ order: { startDate: 'DESC' } });
  }

  async findActive() {
    const today = new Date().toISOString().split('T')[0];
    return this.examPeriodRepo
      .createQueryBuilder('ep')
      .where('ep.startDate <= :today AND ep.endDate >= :today', { today })
      .andWhere('ep.isActive = true')
      .getOne();
  }

  async getAffectedSchedules(examPeriodId: number) {
    const period = await this.examPeriodRepo.findOneOrFail({
      where: { id: examPeriodId },
    });
    const affectedDays = this.getDaysOfWeekInRange(
      period.startDate,
      period.endDate,
    );
    return this.scheduleRepo
      .createQueryBuilder('s')
      .leftJoinAndSelect('s.schoolClass', 'sc')
      .leftJoinAndSelect('s.subject', 'sub')
      .leftJoinAndSelect('s.teacher', 't')
      .where('s.dayOfWeek IN (:...days)', { days: affectedDays })
      .getMany();
  }

  private getDaysOfWeekInRange(start: string, end: string): string[] {
    const dayNames = [
      'SUNDAY',
      'MONDAY',
      'TUESDAY',
      'WEDNESDAY',
      'THURSDAY',
      'FRIDAY',
      'SATURDAY',
    ];
    const days = new Set<string>();
    const current = new Date(start);
    const endDate = new Date(end);
    while (current <= endDate) {
      days.add(dayNames[current.getDay()]);
      current.setDate(current.getDate() + 1);
    }
    return [...days];
  }
}
