// src/teachers/entities/teacher-subject-grade.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  Unique,
} from 'typeorm';
import { Teacher } from './teacher.entity';
import { Subject } from 'src/subject/entities/subject.entity';

@Entity('teacher_subject_grades')
@Unique(['teacher', 'subject', 'grade']) // no duplicate combos
export class TeacherSubjectGrade {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Teacher, (t) => t.subjectGrades, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'teacherId' })
  teacher!: Teacher;

  @ManyToOne(() => Subject, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'subjectId' })
  subject!: Subject;

  @Column({ type: 'int' })
  grade!: number;
}
