import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

// school-config/entities/school-config.entity.ts
@Entity()
export class SchoolConfig {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'time' })
  schoolStartTime!: string; // e.g. "08:00"

  @Column({ type: 'time' })
  schoolEndTime!: string; // e.g. "15:00"

  @Column({ type: 'int', default: 40 })
  periodDurationMinutes!: number;

  @Column({ type: 'int', default: 5 })
  breakDurationMinutes!: number;

  @UpdateDateColumn()
  updatedAt!: Date;
}
