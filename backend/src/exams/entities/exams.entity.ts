import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Schedule } from 'src/schedule/entities/schedule.entity';
import { SchoolClass } from 'src/school-class/entities/school-class.entity';
import { Subject } from 'src/subject/entities/subject.entity';
import { Teacher } from 'src/teachers/entities/teacher.entity';
import { Rooms } from 'src/rooms/entities/rooms.entity';
import { ExamPeriod } from 'src/exam-periods/entities/exam-periods.entity';

// exams/entities/exam.entity.ts
@Entity()
export class Exam {
  @PrimaryGeneratedColumn()
  id!: number;

  // ✅ No Schedule FK — exam is standalone
  @ManyToOne(() => SchoolClass, { eager: true })
  schoolClass!: SchoolClass;

  @ManyToOne(() => Subject, { eager: true })
  subject!: Subject;

  @ManyToOne(() => Teacher, { eager: true })
  teacher!: Teacher;

  @ManyToOne(() => Rooms, { eager: true })
  room!: Rooms;

  @ManyToOne(() => ExamPeriod, (ep) => ep.exams)
  examPeriod!: ExamPeriod;

  @Column({ type: 'date' })
  date!: string;

  @Column({ type: 'time' })
  startTime!: string;

  @Column({ type: 'time' })
  endTime!: string;

  @Column({ default: 'MIDTERM' })
  examType!: 'MIDTERM' | 'FINAL' | 'QUIZ' | 'PRACTICAL';
}
