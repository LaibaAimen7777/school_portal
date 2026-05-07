import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Unique,
} from 'typeorm';
import { Student } from 'src/student/entities/student.entity';
import { Schedule } from 'src/schedule/entities/schedule.entity';

@Entity('attendance')
@Unique(['student', 'schedule', 'date'])
export class Attendance {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Student, { eager: true })
  student!: Student;

  @ManyToOne(() => Schedule, { onDelete: 'CASCADE' })
  schedule!: Schedule;

  @Column({ type: 'date' })
  date!: string;

  @Column({
    type: 'enum',
    enum: ['PRESENT', 'ABSENT'],
    default: 'PRESENT',
  })
  status!: 'PRESENT' | 'ABSENT';
}
