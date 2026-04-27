// src/exam-periods/exam-periods.controller.ts
import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  ParseIntPipe,
} from '@nestjs/common';
import { ExamPeriodsService } from './exam-periods.service';
import { CreateExamPeriodDto } from './dto/create-exam-period.dto';

@Controller('exam-periods')
export class ExamPeriodsController {
  constructor(private readonly examPeriodsService: ExamPeriodsService) {}

  @Post()
  create(@Body() dto: CreateExamPeriodDto) {
    return this.examPeriodsService.create(dto);
  }

  @Get()
  findAll() {
    return this.examPeriodsService.findAll();
  }

  @Get('active')
  findActive() {
    return this.examPeriodsService.findActive();
  }

  @Get(':id/affected-schedules')
  getAffectedSchedules(@Param('id', ParseIntPipe) id: number) {
    return this.examPeriodsService.getAffectedSchedules(id);
  }
}
