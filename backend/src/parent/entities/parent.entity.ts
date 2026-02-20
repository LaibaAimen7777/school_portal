import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Student } from 'src/student/entities/student.entity';

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

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  address: string;

  @OneToMany(() => Student, (student) => student.parent)
  students: Student[];
}
