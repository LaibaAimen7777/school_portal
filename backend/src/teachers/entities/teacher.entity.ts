import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Entity('teachers')
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

  @Column({ nullable: true })
  specialization: string;

  @Column({ type: 'date', nullable: true })
  hireDate: Date;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;
}
