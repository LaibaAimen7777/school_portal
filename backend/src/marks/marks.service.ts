import { Injectable } from '@nestjs/common';
import { Mark } from './entities/marks.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class MarksService {
  constructor(
    @InjectRepository(Mark)
    private marksRepo: Repository<Mark>,
  ) {}

  async saveMarks(body: any) {
    const { examId, records } = body;

    for (const record of records) {
      await this.marksRepo.save({
        student: { id: record.studentId },
        exam: { id: examId },
        score: record.marks,
      });
    }
  }

  async getMarksByExam(examId: number) {
    const marks = await this.marksRepo.find({
      where: {
        exam: { id: examId },
      },
      relations: ['student'],
    });

    return marks.map((m) => ({
      studentId: m.student.id,
      firstName: m.student.firstName,
      lastName: m.student.lastName,
      score: m.score,
    }));
  }
}
