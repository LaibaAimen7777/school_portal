import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToOne,
} from 'typeorm';
import { Parent } from 'src/parent/entities/parent.entity';
import { Student } from 'src/student/entities/student.entity';

export enum UserRole {
  STUDENT = 'student',
  PARENT = 'parent',
  TEACHER = 'teacher',
  ADMIN = 'admin',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, nullable: true })
  username: string;

  // @Column({ unique: true, nullable: true })
  // email: string;

  // @Column({ length: 20, nullable: true })
  // phone: string;

  @Column({ nullable: true })
  password: string;

  @Column({
    type: 'enum',
    enum: UserRole,
  })
  role: UserRole;

  @Column({ default: true })
  can_login: boolean;

  @Column({ default: true })
  must_change_password: boolean;

  @Column({ default: true })
  is_active: boolean;

  @CreateDateColumn()
  created_at: Date;

  @OneToOne(() => Parent, (parent) => parent.user)
  parent: Parent;

  @OneToOne(() => Student, (student) => student.user)
  student: Student;

  // @OneToOne(() => Teacher, (teacher) => teacher.user)
  // teacher: Teacher;
}
