import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Student } from 'src/student/entities/student.entity';
import { Schedule } from 'src/schedule/entities/schedule.entity';

@Entity('attendance')
export class Attendance {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Student)
  student: Student;

  @ManyToOne(() => Schedule)
  schedule: Schedule;

  @Column({ type: 'date' })
  date: Date;

  @Column({
    type: 'enum',
    enum: ['PRESENT', 'ABSENT'],
    default: 'PRESENT',
  })
  status: string;
}
