import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Exam } from './entities/exams.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ExamsService {
  constructor(
    @InjectRepository(Exam)
    private examRepo: Repository<Exam>,
  ) {}

  async getTeacherExams(teacherId: number) {
    const exams = await this.examRepo.find({
      relations: ['schedule', 'schedule.subject', 'schedule.schoolClass'],
      where: {
        schedule: {
          teacher: { id: teacherId },
        },
      },
      order: {
        date: 'DESC',
      },
    });

    // Optional: filter only past exams
    const today = new Date().toISOString().split('T')[0];

    return exams.filter((exam) => exam.date <= today);
  }

  async createExam(body: any) {
    const { examType, date, scheduleId } = body;

    let exam = await this.examRepo.findOne({
      where: {
        examType,
        date,
        schedule: { id: scheduleId },
      },
      relations: ['schedule'],
    });

    if (!exam) {
      exam = await this.examRepo.save({
        examType,
        date,
        schedule: { id: scheduleId },
      });
    }

    return exam;
  }
}
