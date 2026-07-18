import { Module } from '@nestjs/common';
import { ParentService } from './parent.service';
import { ParentController } from './parent.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from 'src/student/entities/student.entity';
import { Parent } from './entities/parent.entity';
import { Attendance } from 'src/attendance/entities/attendance.entity';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Parent, Student, Attendance, User])],
  providers: [ParentService],
  controllers: [ParentController],
  exports: [ParentService],
})
export class ParentModule {}
