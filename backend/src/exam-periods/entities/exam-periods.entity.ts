// exam-periods/entities/exam-period.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Exam } from 'src/exams/entities/exams.entity';

export enum ExamTermType {
  FIRST_TERM = 'FIRST TERM',
  SECOND_TERM = 'SECOND TERM',
  THIRD_TERM = 'THIRD TERM',
}

// Default durations per term (in minutes) — used as the period's default
export const TERM_DEFAULT_DURATIONS: Record<ExamTermType, number> = {
  [ExamTermType.FIRST_TERM]: 60, // 1 hour
  [ExamTermType.SECOND_TERM]: 120, // 2 hours
  [ExamTermType.THIRD_TERM]: 180, // 3 hours
};

@Entity()
export class ExamPeriod {
  @PrimaryGeneratedColumn()
  id!: number;

  // e.g. "First Term 2025" — still allow a custom label
  @Column()
  name!: string;

  @Column({
    type: 'enum',
    enum: ExamTermType,
  })
  examType!: ExamTermType;

  // Default exam duration for this period — admin can change it
  @Column({ type: 'int' })
  durationMinutes!: number;

  @Column({ type: 'date' })
  startDate!: string;

  @Column({ type: 'date' })
  endDate!: string;

  @Column({ default: true })
  isActive!: boolean;

  @OneToMany(() => Exam, (exam) => exam.examPeriod)
  exams!: Exam[];
}
