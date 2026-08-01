import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Param,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles.decorator';

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

  @UseGuards(JwtAuthGuard)
  @Roles('teacher')
  @Get('pending')
  getPending(@Query('teacherId') teacherId: number) {
    return this.service.getPreviousPending(Number(teacherId));
  }
}
