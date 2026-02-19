import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  Unique,
} from 'typeorm';
import { Student } from 'src/student/entities/student.entity';

@Entity()
@Unique(['grade', 'section']) // Prevent duplicate 10A
export class SchoolClass {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  grade: number;

  @Column()
  section: string;

  @Column()
  maxStrength: number;

  @OneToMany(() => Student, (student) => student.schoolClass)
  students: Student[];
}
