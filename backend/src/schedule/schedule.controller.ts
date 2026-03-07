import { Controller, Post, Body, Get } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Schedule } from './entities/schedule.entity';
import { Repository } from 'typeorm';
import { Teacher } from 'src/teachers/entities/teacher.entity';
import { Subject } from 'src/subject/entities/subject.entity';
import { SchoolClass } from 'src/school-class/entities/school-class.entity';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { ScheduleService } from './schedule.service';

@Controller('schedule')
export class ScheduleController {
  constructor(
    @InjectRepository(Schedule)
    private scheduleRepo: Repository<Schedule>,

    @InjectRepository(Teacher)
    private teacherRepo: Repository<Teacher>,

    @InjectRepository(Subject)
    private subjectRepo: Repository<Subject>,

    @InjectRepository(SchoolClass)
    private classRepo: Repository<SchoolClass>,

    private readonly scheduleService: ScheduleService,
  ) {}

  @Post()
  create(@Body() dto: CreateScheduleDto) {
    return this.scheduleService.create(dto);
  }

  // @Get()
  // async findAll(){
  //   return this.scheduleRepo.findAll();
  // }
}
