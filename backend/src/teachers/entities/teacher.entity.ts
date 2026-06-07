// src/teachers/entities/teacher.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { TeacherSubjectGrade } from './teacher-subject-grade.entity';
import { Schedule } from 'src/schedule/entities/schedule.entity';

@Entity()
export class Teacher {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  teacherCode!: string;

  @Column()
  fullName!: string;

  @Column({ nullable: true })
  qualification!: string;

  @Column({ type: 'date', nullable: true })
  hireDate!: string;

  @OneToOne(() => User, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn()
  user!: User;

  @OneToMany(() => TeacherSubjectGrade, (tsg) => tsg.teacher, { cascade: true })
  subjectGrades!: TeacherSubjectGrade[];

  @OneToMany(() => Schedule, (schedule) => schedule.teacher)
  schedules!: Schedule[];
}
