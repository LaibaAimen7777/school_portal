import { Controller, UseGuards, Post, Body, Get, Query } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { SchoolClassService } from './school-class.service';
import { CreateClassDto } from './dto/create-class.dto';

@Controller('school-class')
export class SchoolClassController {
  constructor(private readonly schoolClassService: SchoolClassService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Post()
  create(@Body() dto: CreateClassDto) {
    return this.schoolClassService.create(dto);
  }

  @Get()
  findByGrade(@Query('grade') grade: number) {
    return this.schoolClassService.findByGrade(Number(grade));
  }

  @Get('grades')
  getGrades() {
    return this.schoolClassService.getGrades();
  }

  @Get('sections')
  getSections(@Query('gradeId') gradeId: number) {
    return this.schoolClassService.getSections(Number(gradeId));
  }
}
