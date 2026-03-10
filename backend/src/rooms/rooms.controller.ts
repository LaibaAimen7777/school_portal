import { Controller, Get, Query } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Rooms } from './entities/rooms.entity';
import { Repository } from 'typeorm';
@Controller('rooms')
export class RoomsController {
  constructor(
    @InjectRepository(Rooms)
    private roomService: RoomsService,
  ) {}

  @Get('available')
  async getAvailableRooms(
    @Query('dayOfWeek') dayOfWeek: string,
    @Query('startTime') startTime: string,
    @Query('endTime') endTime: string,
  ) {
    return this.roomService.getAvailableRooms(dayOfWeek, startTime, endTime);
  }
}
