import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToOne,
  JoinColumn,
  Unique,
  RelationId,
} from 'typeorm';
import { SchoolClass } from 'src/school-class/entities/school-class.entity';
import { User } from 'src/users/entities/user.entity';
import { Parent } from 'src/parent/entities/parent.entity';

@Entity()
@Unique(['schoolClass', 'rollNumber']) // roll unique inside class
export class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' })
  dateOfBirth: Date;

  @Column()
  gender: string; // or enum later

  @Column()
  rollNumber: number;

  @Column()
  joiningYear: number;

  @ManyToOne(() => SchoolClass, (schoolClass) => schoolClass.students, {
    nullable: false,
    onDelete: 'CASCADE',
    eager: true, // optional: load class automatically
  })
  @JoinColumn({ name: 'schoolClassId' })
  schoolClass: SchoolClass;

  //   @RelationId((student: Student) => student.schoolClass)
  //   schoolClassId: number;

  @OneToOne(() => User, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => Parent, (parent) => parent.students, {
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'parentId' })
  parent: Parent;
}
