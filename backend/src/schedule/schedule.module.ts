import { Module } from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { ScheduleController } from './schedule.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Schedule } from './entities/schedule.entity';
import { Teacher } from 'src/teachers/entities/teacher.entity';
import { Subject } from 'src/subject/entities/subject.entity';
import { SchoolClass } from 'src/school-class/entities/school-class.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Schedule, Teacher, Subject, SchoolClass]),
  ],
  providers: [ScheduleService],
  controllers: [ScheduleController],
  exports: [ScheduleService],
})
export class ScheduleModule {}
