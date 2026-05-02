// src/subject/subject.controller.ts
import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { SubjectService } from './subject.service';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';

@Controller('subject')
export class SubjectController {
  constructor(private readonly subjectService: SubjectService) {}

  @Post()
  create(@Body() dto: CreateSubjectDto) {
    return this.subjectService.create(dto);
  }

  // GET /subject?grade=9 — filtered by grade
  @Get()
  findAll(@Query('grade') grade?: string) {
    return this.subjectService.findAll(grade ? parseInt(grade) : undefined);
  }

  // GET /subject/by-grade — grouped curriculum view
  @Get('by-grade')
  findGroupedByGrade() {
    return this.subjectService.findGroupedByGrade();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.subjectService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateSubjectDto) {
    return this.subjectService.update(id, dto);
  }

  @Patch(':id/grades')
  updateGrades(
    @Param('id', ParseIntPipe) id: number,
    @Body('grades') grades: number[],
  ) {
    return this.subjectService.updateGrades(id, grades);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.subjectService.remove(id);
  }
}
