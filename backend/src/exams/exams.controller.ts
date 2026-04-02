import { Controller, Get, Req, Post, Body, UseGuards } from '@nestjs/common';
import { ExamsService } from './exams.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('exams')
export class ExamsController {
  constructor(private readonly examsService: ExamsService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getTeacherExams(@Req() req) {
    const teacherId = req.user.id; // from JWT
    return this.examsService.getTeacherExams(teacherId);
  }

  @Post()
  createExam(@Body() body) {
    return this.examsService.createExam(body);
  }
}
