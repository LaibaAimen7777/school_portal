import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { AttendanceService } from './attendance.service';

@Controller('attendance')
export class AttendanceController {
  constructor(private readonly service: AttendanceService) {}

  @Get()
  getAttendance(
    @Query('scheduleId') scheduleId: number,
    @Query('date') date: string,
  ) {
    return this.service.get(scheduleId, date);
  }

  @Post('mark')
  markAttendance(@Body() body: any) {
    return this.service.mark(body);
  }
}
