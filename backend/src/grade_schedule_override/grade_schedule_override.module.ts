import { Module } from '@nestjs/common';
import { GradeOverrideController } from './grade_schedule_override.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SchoolConfig } from 'src/school-config/entities/school-config.entity';
import { GradeOverrideService } from './grade_schedule_override.service';
import { GradeScheduleOverride } from './entities/gradeSchedule.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SchoolConfig, GradeScheduleOverride])],
  controllers: [GradeOverrideController],
  providers: [GradeOverrideService],
})
export class GradeScheduleOverrideModule {}
