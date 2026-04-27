// src/exams/exams.controller.ts
import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  ParseIntPipe,
} from '@nestjs/common';
import { ExamsService } from './exams.service';
import { CreateExamDto } from './dto/create-exam.dto';

@Controller('exams')
export class ExamsController {
  constructor(private readonly examsService: ExamsService) {}

  @Post()
  create(@Body() dto: CreateExamDto) {
    return this.examsService.createExam(dto);
  }

  @Get()
  findAll() {
    return this.examsService.findAll();
  }

  @Get('teacher/:teacherId')
  getTeacherExams(@Param('teacherId', ParseIntPipe) teacherId: number) {
    return this.examsService.getTeacherExams(teacherId);
  }
}
