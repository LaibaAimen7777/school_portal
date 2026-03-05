import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Schedule } from 'src/schedule/entities/schedule.entity';

@Entity('subjects')
export class Subject {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ unique: true })
  code: string;

  @OneToMany(() => Schedule, (schedule: Schedule) => schedule.subject)
  schedules: Schedule[];
}
