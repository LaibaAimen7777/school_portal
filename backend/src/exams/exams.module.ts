import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Exam } from './entities/exams.entity';
import { ExamsService } from './exams.service';
import { ExamsController } from './exams.controller';
import { ExamPeriod } from 'src/exam-periods/entities/exam-periods.entity';
import { Subject } from 'src/subject/entities/subject.entity';
import { SchoolClass } from 'src/school-class/entities/school-class.entity';
import { Teacher } from 'src/teachers/entities/teacher.entity';
import { Rooms } from 'src/rooms/entities/rooms.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Exam,
      ExamPeriod,
      Subject,
      SchoolClass,
      Teacher,
      Rooms,
    ]),
  ],
  providers: [ExamsService],
  controllers: [ExamsController],
})
export class ExamsModule {}
