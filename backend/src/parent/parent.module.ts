import { Module } from '@nestjs/common';
import { ParentService } from './parent.service';
import { ParentController } from './parent.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from 'src/student/entities/student.entity';
import { Parent } from './entities/parent.entity';
import { Attendance } from 'src/attendance/entities/attendance.entity';
import { Mark } from 'src/marks/entities/marks.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Parent, Student, Attendance, Mark])],
  providers: [ParentService],
  controllers: [ParentController],
  exports: [ParentService],
})
export class ParentModule {}
