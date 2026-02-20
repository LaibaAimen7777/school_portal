import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { SchoolClass } from 'src/school-class/entities/school-class.entity';
import { User } from 'src/users/entities/user.entity';
import { Parent } from 'src/parent/entities/parent.entity';

@Entity()
export class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  rollNumber: number;

  @Column()
  joiningYear: number;

  @ManyToOne(() => SchoolClass, (schoolClass) => schoolClass.students)
  schoolClass: SchoolClass;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @ManyToOne(() => Parent, (parent) => parent.students, { eager: true })
  parent: Parent;
}
