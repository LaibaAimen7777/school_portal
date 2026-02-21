import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToOne,
  JoinColumn,
  Unique,
} from 'typeorm';
import { SchoolClass } from 'src/school-class/entities/school-class.entity';
import { User } from 'src/users/entities/user.entity';
import { Parent } from 'src/parent/entities/parent.entity';

@Entity()
@Unique(['schoolClass', 'rollNumber']) // roll unique inside class
export class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ type: 'date' })
  dateOfBirth: Date;

  @Column()
  gender: string; // or enum later

  @Column()
  rollNumber: number;

  @Column()
  joiningYear: number;

  @Column()
  schoolClassId: number;

  @ManyToOne(() => SchoolClass, (schoolClass) => schoolClass.students, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'schoolClassId' })
  schoolClass: SchoolClass;

  @OneToOne(() => User, { nullable: true })
  @JoinColumn()
  user: User | null; // IMPORTANT

  @ManyToOne(() => Parent, (parent) => parent.students, {
    eager: true,
    onDelete: 'CASCADE',
  })
  parent: Parent;
}
