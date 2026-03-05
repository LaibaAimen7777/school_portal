import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Subject } from 'src/subject/entities/subject.entity';
import { Schedule } from 'src/schedule/entities/schedule.entity';

@Entity('teachers')
export class Teacher {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  teacherCode: string;

  @Column()
  fullName: string;

  @Column()
  qualification: string;

  // @Column({ nullable: true })
  // specialization: string;

  @Column({ type: 'date', nullable: true })
  hireDate: Date;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @ManyToMany(() => Subject)
  @JoinTable()
  subjects: Subject[];

  @OneToMany(() => Schedule, (schedule: Schedule) => schedule.teacher)
  schedules: Schedule[];
}
