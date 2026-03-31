import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Subject } from 'src/subject/entities/subject.entity';
import { SchoolClass } from 'src/school-class/entities/school-class.entity';

@Entity('exams')
export class Exam {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string; // Midterm, Final

  @ManyToOne(() => Subject)
  subject: Subject;

  @ManyToOne(() => SchoolClass)
  schoolClass: SchoolClass;
}
