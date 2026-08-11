import { GradeOverrideService } from 'src/grade_schedule_override/grade_schedule_override.service';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { GradeScheduleOverride } from 'src/grade_schedule_override/entities/gradeSchedule.entity';

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

  @Column({ default: 4 })
  breakAfterPeriod!: number; // break happens after this period number, not every period

  @Column({ type: 'time', nullable: true })
  fridayEndTime!: string | null; // null = same as regular day

  @OneToMany(() => GradeScheduleOverride, (o) => o.schoolConfig, {
    cascade: true,
  })
  gradeOverrides!: GradeScheduleOverride[];
}
