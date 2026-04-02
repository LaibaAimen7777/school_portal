import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Schedule } from 'src/schedule/entities/schedule.entity';

@Entity('exams')
export class Exam {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  examType: string; // Mid, Final, Quiz

  @Column()
  date: string; // IMPORTANT

  @ManyToOne(() => Schedule)
  schedule: Schedule; // IMPORTANT
}
