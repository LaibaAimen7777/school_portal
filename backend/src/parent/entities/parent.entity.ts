import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Student } from 'src/student/entities/student.entity';
import { User } from 'src/users/entities/user.entity';

@Entity()
export class Parent {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fatherName: string;

  @Column()
  motherName: string;

  @Column({ unique: true })
  phone: string; // unique identifier to avoid duplicates

  @Column({ type: 'varchar', length: 255, nullable: true })
  email: string | null;

  @Column({ nullable: true })
  address: string;

  @OneToMany(() => Student, (student) => student.parent)
  students: Student[];

  @OneToOne(() => User, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn()
  user: User;
}
