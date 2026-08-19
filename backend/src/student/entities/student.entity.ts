import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  Unique,
} from 'typeorm';
import { SchoolClass } from 'src/school-class/entities/school-class.entity';
import { User } from 'src/users/entities/user.entity';
import { Parent } from 'src/parent/entities/parent.entity';

@Entity()
@Unique(['schoolClass', 'rollNumber'])
export class Student {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  firstName!: string;

  @Column()
  lastName!: string;

  @Column({ type: 'date' })
  dateOfBirth!: Date;

  @Column()
  gender!: string;

  @Column()
  rollNumber!: number;

  @Column()
  joiningYear!: number;

  // ── graduation ───────────────────────────────────────────────────────────
  @Column({ default: false })
  isGraduated!: boolean;

  @Column({ type: 'date', nullable: true })
  graduatedAt!: Date | null;

  // ── relations ────────────────────────────────────────────────────────────

  // SET NULL so deleting a class doesn't wipe student records
  @ManyToOne(() => SchoolClass, (schoolClass) => schoolClass.students, {
    nullable: true,
    onDelete: 'SET NULL',
    eager: true,
  })
  @JoinColumn({ name: 'schoolClassId' })
  schoolClass!: SchoolClass | null;

  @ManyToOne(() => Parent, (parent) => parent.students, {
    eager: true,
    onDelete: 'SET NULL',
    nullable: true,
  })
  @JoinColumn({ name: 'parentId' })
  parent!: Parent | null;
}
