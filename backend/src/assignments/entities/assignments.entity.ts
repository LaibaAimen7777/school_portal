import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Teacher } from 'src/teachers/entities/teacher.entity';
import { Subject } from 'src/subject/entities/subject.entity';
import { SchoolClass } from 'src/school-class/entities/school-class.entity';

@Entity('assignments')
export class Assignment {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column()
  description!: string;

  @Column({ type: 'date' })
  dueDate!: Date;

  @ManyToOne(() => Teacher)
  teacher!: Teacher;

  @ManyToOne(() => Subject)
  subject!: Subject;

  @ManyToOne(() => SchoolClass)
  schoolClass!: SchoolClass;
}
