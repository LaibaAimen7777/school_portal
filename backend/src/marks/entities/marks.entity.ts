import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Student } from 'src/student/entities/student.entity';
import { Exam } from 'src/exams/entities/exams.entity';

@Entity('marks')
export class Mark {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Student)
  student: Student;

  @ManyToOne(() => Exam)
  exam: Exam;

  @Column('float')
  score: number;
}
