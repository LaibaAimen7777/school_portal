import { Module } from '@nestjs/common';
import { SchoolConfigController } from './school-config.controller';
import { SchoolConfigService } from './school-config.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SchoolConfig } from './entities/school-config.entity';
import { Schedule } from 'src/schedule/entities/schedule.entity';
import { GradeScheduleOverride } from 'src/grade_schedule_override/entities/gradeSchedule.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([SchoolConfig, Schedule, GradeScheduleOverride]),
  ],
  controllers: [SchoolConfigController],
  providers: [SchoolConfigService],
})
export class SchoolConfigModule {}
