import { Body, Controller, Post, Get, Query } from '@nestjs/common';
import { MarksService } from './marks.service';

@Controller('marks')
export class MarksController {
  constructor(private readonly marksService: MarksService) {}

  @Post()
  async saveMarks(@Body() body) {
    return this.marksService.saveMarks(body);
  }

  @Get()
  getMarks(@Query('examId') examId: number) {
    return this.marksService.getMarksByExam(examId);
  }
}
