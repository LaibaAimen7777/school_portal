import { Module } from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Attendance } from './entities/attendance.entity';
import { AttendanceController } from './attendance.controller';
import { Schedule } from 'src/schedule/entities/schedule.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Attendance, Schedule])],
  providers: [AttendanceService],
  controllers: [AttendanceController],
})
export class AttendanceModule {}
