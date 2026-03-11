import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Rooms } from './entities/rooms.entity';
import { Repository } from 'typeorm';
import { Schedule } from 'src/schedule/entities/schedule.entity';

@Injectable()
export class RoomsService {
  constructor(
    @InjectRepository(Rooms)
    private roomRepo: Repository<Rooms>,

    @InjectRepository(Schedule)
    private scheduleRepo: Repository<Schedule>,
  ) {}

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
}
