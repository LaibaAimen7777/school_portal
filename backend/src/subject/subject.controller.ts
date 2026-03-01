import { Controller, Post, Body, Get } from '@nestjs/common';
import { SubjectService } from './subject.service';

@Controller('subject')
export class SubjectController {
  constructor(private readonly subjectService: SubjectService) {}

  @Post()
  create(@Body() body: { name: string; code: string }) {
    return this.subjectService.create(body.name, body.code);
  }

  @Get()
  findAll() {
    return this.subjectService.findAll();
  }
}
