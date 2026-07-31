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

  async getPreviousPending(teacherId: number) {
    const result = await this.repo.query(
      `
    SELECT 
      s.id AS scheduleId,
      sub.name AS subject,
      DATE_FORMAT(d.date, '%Y-%m-%d') AS date,
      s.startTime
    FROM (
      SELECT CURDATE() - INTERVAL n DAY AS date
      FROM (
        SELECT 1 n UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 
        UNION SELECT 5 UNION SELECT 6 UNION SELECT 7
      ) numbers
    ) d
    JOIN schedule s 
      ON UPPER(DAYNAME(d.date)) = s.dayOfWeek
    JOIN subject sub 
      ON sub.id = s.subjectId
    LEFT JOIN attendance a 
      ON a.scheduleId = s.id 
      AND a.date = d.date
    WHERE s.teacherId = ?
      AND a.id IS NULL
      AND d.date < CURDATE()
    ORDER BY d.date DESC, s.startTime ASC;
    `,
      [teacherId],
    );

    return result;
  }
}
