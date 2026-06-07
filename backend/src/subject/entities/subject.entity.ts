// src/subject/entities/subject.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Schedule } from 'src/schedule/entities/schedule.entity';

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
}
