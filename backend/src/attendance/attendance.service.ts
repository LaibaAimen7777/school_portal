import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Attendance } from './entities/attendance.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AttendanceService {
  constructor(
    @InjectRepository(Attendance)
    private repo: Repository<Attendance>,
  ) {}

  async get(scheduleId: number, date: string) {
    return this.repo.find({
      where: {
        schedule: { id: scheduleId },
        date,
      },
    });
  }

  async mark(body: any) {
    const { scheduleId, records, date } = body;
    console.log('records in b in as:', records);
    for (const record of records) {
      const existing = await this.repo.findOne({
        where: {
          student: { id: record.studentId },
          schedule: { id: scheduleId },
          date,
        },
      });

      if (existing) {
        existing.status = record.status;
        await this.repo.save(existing);
      } else {
        const newAttendance = this.repo.create({
          student: { id: record.studentId },
          schedule: { id: scheduleId },
          date,
          status: record.status,
        });

        await this.repo.save(newAttendance);
      }
    }

    return { message: 'Attendance marked' };
  }
}
