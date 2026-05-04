import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToMany,
} from 'typeorm';
import { Schedule } from 'src/schedule/entities/schedule.entity';
import { Teacher } from 'src/teachers/entities/teacher.entity';

@Entity('subjects')
export class Subject {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  name!: string;

  @Column({ unique: true })
  code!: string;

  @Column({ type: 'json', nullable: true })
  grades!: number[];

  @Column({ default: 5 })
  periodsPerWeek!: number;

  @Column({ default: true })
  isActive!: boolean;

  @OneToMany(() => Schedule, (schedule: Schedule) => schedule.subject)
  schedules!: Schedule[];

  @ManyToMany(() => Teacher, (teacher) => teacher.subjects)
  teachers!: Teacher[];
}
