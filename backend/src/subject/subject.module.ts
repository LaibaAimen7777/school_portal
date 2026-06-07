import { Module } from '@nestjs/common';
import { SubjectService } from './subject.service';
import { SubjectController } from './subject.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subject } from './entities/subject.entity';
import { Teacher } from 'src/teachers/entities/teacher.entity';
import { TeacherSubjectGrade } from 'src/teachers/entities/teacher-subject-grade.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Subject, Teacher, TeacherSubjectGrade])],
  providers: [SubjectService],
  controllers: [SubjectController],
  exports: [SubjectService],
})
export class SubjectModule {}
