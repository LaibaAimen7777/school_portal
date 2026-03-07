import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { Teacher } from 'src/teachers/entities/teacher.entity';
import { Subject } from 'src/subject/entities/subject.entity';
import { SchoolClass } from 'src/school-class/entities/school-class.entity';

@Entity()
export class Schedule {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => SchoolClass, (schoolClass) => schoolClass.schedules, {
    eager: true,
  })
  schoolClass: SchoolClass;

  @ManyToOne(() => Subject, (subject) => subject.schedules, {
    eager: true,
  })
  subject: Subject;

  @ManyToOne(() => Teacher, (teacher) => teacher.schedules, {
    eager: true,
  })
  teacher: Teacher;

  @Column()
  dayOfWeek: string; // MONDAY, TUESDAY

  @Column()
  startTime: string; // 09:00

  @Column()
  endTime: string; // 10:00

  @Column()
  room: string;
}
