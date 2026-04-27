import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Exam } from 'src/exams/entities/exams.entity';

// exam-periods/entities/exam-period.entity.ts
@Entity()
export class ExamPeriod {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string; // e.g. "Mid-Term 2025", "Final Exams Spring"

  @Column({ type: 'date' })
  startDate!: string;

  @Column({ type: 'date' })
  endDate!: string;

  @Column({ default: true })
  isActive!: boolean;

  @OneToMany(() => Exam, (exam) => exam.examPeriod)
  exams!: Exam[];
}
