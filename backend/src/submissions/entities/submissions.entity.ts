import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { Student } from 'src/student/entities/student.entity';
import { Assignment } from 'src/assignments/entities/assignments.entity';

@Entity('submissions')
export class Submission {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Assignment)
  assignment!: Assignment;

  @ManyToOne(() => Student)
  student!: Student;

  @Column()
  fileUrl!: string;

  @Column({ nullable: true })
  marks!: number;

  @Column({ nullable: true })
  feedback!: string;

  @CreateDateColumn()
  submittedAt!: Date;
}
