import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Rooms } from './entities/rooms.entity';
import { Repository } from 'typeorm';
import { Schedule } from 'src/schedule/entities/schedule.entity';
import { Exam } from 'src/exams/entities/exams.entity';

@Injectable()
export class RoomsService {
  constructor(
    @InjectRepository(Rooms)
    private roomRepo: Repository<Rooms>,

    @InjectRepository(Schedule)
    private scheduleRepo: Repository<Schedule>,

    @InjectRepository(Exam)
    private examRepo: Repository<Exam>,
  ) {}

  private getDayFromDate(date: string): string {
    const days = [
      'SUNDAY',
      'MONDAY',
      'TUESDAY',
      'WEDNESDAY',
      'THURSDAY',
      'FRIDAY',
      'SATURDAY',
    ];

    return days[new Date(date).getDay()];
  }

  async getAvailableRooms(
    dayOfWeek: string,
    startTime: string,
    endTime: string,
  ) {
    const allRooms = await this.roomRepo.find();
    console.log('allrooms in rs in b:', allRooms);

    const bookedRooms = await this.scheduleRepo
      .createQueryBuilder('schedule')
      .where('schedule.dayOfWeek =:dayOfWeek', { dayOfWeek })
      .andWhere(
        '(schedule.startTime <:endTime AND schedule.endTime >:startTime)',
        { startTime, endTime },
      )
      .getMany();

    const bookedRoomIds = new Set(
      bookedRooms
        .filter((s) => s.room) // Only keep schedules that have a room
        .map((s) => s.room.id),
    );

    return allRooms.filter((room) => !bookedRoomIds.has(room.id));
  }

  async getAvailableExamRooms(
    date: string,
    startTime: string,
    endTime: string,
  ) {
    const allRooms = await this.roomRepo.find();

    // 1️⃣ Rooms booked in EXAMS
    const examConflicts = await this.examRepo
      .createQueryBuilder('e')
      .leftJoinAndSelect('e.room', 'room')
      .where('e.date = :date', { date })
      .andWhere('(e.startTime < :endTime AND e.endTime > :startTime)', {
        startTime,
        endTime,
      })
      .getMany();

    const scheduleConflicts = await this.scheduleRepo
      .createQueryBuilder('schedule')
      .where('schedule.dayOfWeek = :day', {
        day: this.getDayFromDate(date),
      })
      .andWhere(
        '(schedule.startTime < :endTime AND schedule.endTime > :startTime)',
        { startTime, endTime },
      )
      .getMany();

    // 3️⃣ Collect booked room IDs
    const bookedRoomIds = new Set([
      ...examConflicts.map((e) => e.room?.id),
      ...scheduleConflicts.map((s) => s.room?.id),
    ]);

    // 4️⃣ Return available rooms
    return allRooms.filter((room) => !bookedRoomIds.has(room.id));
  }
}
