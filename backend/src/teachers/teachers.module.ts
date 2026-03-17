import { Module } from '@nestjs/common';
import { TeachersService } from './teachers.service';
import { TeachersController } from './teachers.controller';
import { User } from 'src/users/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Teacher } from './entities/teacher.entity';
import { Subject } from 'src/subject/entities/subject.entity';
import { Schedule } from 'src/schedule/entities/schedule.entity';
import { Student } from 'src/student/entities/student.entity';
import { SchoolClass } from 'src/school-class/entities/school-class.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Teacher,
      User,
      Subject,
      Schedule,
      Student,
      SchoolClass,
    ]),
  ],
  providers: [TeachersService],
  controllers: [TeachersController],
})
export class TeachersModule {}
