// src/schedule/schedule.controller.ts
import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  ParseIntPipe,
} from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { CreateScheduleDto } from './dto/create-schedule.dto';

@Controller('schedule')
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}

  @Post()
  create(@Body() dto: CreateScheduleDto) {
    return this.scheduleService.create(dto);
  }

  @Get()
  findAll() {
    return this.scheduleService.findAll();
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.scheduleService.remove(id);
  }

  @Get('completeness')
  getCompletenessReport() {
    return this.scheduleService.getCompletenessReport();
  }

  @Get('workload')
  getTeacherWorkloadReport() {
    return this.scheduleService.getTeacherWorkloadReport();
  }

  @Get('reminders')
  getDashboardReminders() {
    return this.scheduleService.getDashboardReminders();
  }

  @Post('auto')
  autoSchedule() {
    return this.scheduleService.autoSchedule();
  }

  @Delete('clear-and-regenerate')
  clearAndAutoSchedule() {
    return this.scheduleService.clearAndAutoSchedule();
  }
}
