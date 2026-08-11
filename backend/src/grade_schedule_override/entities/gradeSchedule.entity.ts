import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  Unique,
} from 'typeorm';
// import { SchoolConfig } from 'src/school-config/entities/school-config.entity';
import { SchoolConfig } from '../../school-config/entities/school-config.entity';

@Entity('grade_schedule_override')
@Unique(['grade', 'schoolConfig']) // one override per grade per config
export class GradeScheduleOverride {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  grade!: number; // 1–10

  // Overrides the school's default end time Mon–Thu for this grade.
  // null = use school default
  @Column({ type: 'time', nullable: true })
  endTime!: string | null;

  // Overrides the school's Friday end time for this grade.
  // null = fall back to global fridayEndTime, then regular endTime
  @Column({ type: 'time', nullable: true })
  fridayEndTime!: string | null;

  @ManyToOne(() => SchoolConfig, (config) => config.gradeOverrides, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  schoolConfig!: SchoolConfig;
}
