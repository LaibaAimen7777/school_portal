// exams/entities/exam.entity.ts
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { SchoolClass } from 'src/school-class/entities/school-class.entity';
import { Subject } from 'src/subject/entities/subject.entity';
import { Teacher } from 'src/teachers/entities/teacher.entity';
import { Rooms } from 'src/rooms/entities/rooms.entity';
import {
  ExamPeriod,
  ExamTermType,
} from 'src/exam-periods/entities/exam-periods.entity';

@Entity()
export class Exam {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => SchoolClass, { eager: true })
  schoolClass!: SchoolClass;

  @ManyToOne(() => Subject, { eager: true })
  subject!: Subject;

  @ManyToOne(() => Teacher, { eager: true })
  teacher!: Teacher;

  @ManyToOne(() => Rooms, { eager: true })
  room!: Rooms;

  @ManyToOne(() => ExamPeriod, (ep) => ep.exams, { eager: true })
  examPeriod!: ExamPeriod;

  @Column({ type: 'date' })
  date!: string;

  @Column({ type: 'time' })
  startTime!: string;

  @Column({ type: 'time' })
  endTime!: string;

  // Mirrors the exam period's examType — stored here for quick querying
  @Column({
    type: 'enum',
    enum: ExamTermType,
    default: ExamTermType.FIRST_TERM,
  })
  examType!: ExamTermType;
}
