import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  Unique,
} from 'typeorm';
import { Student } from 'src/student/entities/student.entity';

@Entity()
@Unique(['grade', 'section'])
export class SchoolClass {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  grade: number;

  @Column()
  section: string;

  @Column()
  maxStrength: number;

  @Column({ default: 0 })
  currentStrength: number; // NEW

  @OneToMany(() => Student, (student) => student.schoolClass)
  students: Student[];
}
