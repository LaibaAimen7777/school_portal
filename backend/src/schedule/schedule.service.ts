import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Schedule } from './entities/schedule.entity';
import { Repository } from 'typeorm';
import { Teacher } from 'src/teachers/entities/teacher.entity';
import { Subject } from 'src/subject/entities/subject.entity';
import { SchoolClass } from 'src/school-class/entities/school-class.entity';
import { Rooms } from 'src/rooms/entities/rooms.entity';

@Injectable()
export class ScheduleService {
  constructor(
    @InjectRepository(Schedule)
    private scheduleRepo: Repository<Schedule>,

    @InjectRepository(Teacher)
    private teacherRepo: Repository<Teacher>,

    @InjectRepository(Subject)
    private subjectRepo: Repository<Subject>,

    @InjectRepository(SchoolClass)
    private classRepo: Repository<SchoolClass>,

    @InjectRepository(Rooms)
    private roomRepo: Repository<Rooms>,
  ) {}
  async create(createScheduleDto: CreateScheduleDto) {
    const {
      classId,
      subjectId,
      teacherId,
      roomId,
      dayOfWeek,
      startTime,
      endTime,
    } = createScheduleDto;

    const schoolClass = await this.classRepo.findOne({
      where: { id: classId },
    });
    if (!schoolClass) throw new NotFoundException('Class not found');

    const subject = await this.subjectRepo.findOne({
      where: { id: subjectId },
    });
    if (!subject) throw new NotFoundException('Subject not found');

    const teacher = await this.teacherRepo.findOne({
      where: { id: teacherId },
      relations: ['subjects'],
    });
    if (!teacher) throw new NotFoundException('Teacher not found');

    const room = await this.roomRepo.findOne({ where: { id: roomId } });
    if (!room) throw new NotFoundException('Room Not Found');

    // ✅ Check teacher teaches that subject
    const teachesSubject = teacher.subjects.some((sub) => sub.id === subjectId);
    if (!teachesSubject)
      throw new BadRequestException('Teacher is not assigned to this subject');

    const teacherConflict = await this.scheduleRepo
      .createQueryBuilder('schedule')
      .where('schedule.teacherId = :teacherId', { teacherId })
      .andWhere('schedule.dayOfWeek = :dayOfWeek', { dayOfWeek })
      .andWhere(
        '(schedule.startTime < :endTime AND schedule.endTime > :startTime)',
        { startTime, endTime },
      )
      .getOne();

    if (teacherConflict) {
      throw new BadRequestException(
        'Teacher already has a class during this time',
      );
    }

    // ✅ Check class time conflict
    const classConflict = await this.scheduleRepo.findOne({
      where: {
        schoolClass: { id: classId },
        dayOfWeek,
      },
    });

    if (classConflict)
      throw new BadRequestException('Class already has a schedule on this day');

    const roomConflict = await this.scheduleRepo
      .createQueryBuilder('schedule')
      .where('schedule.roomId=:roomId', { roomId })
      .andWhere('schedule.dayOfWeek=:dayOfWeek', { dayOfWeek })
      .andWhere(
        '(schedule.startTime<:endTime AND schedule.endTime>:startTime',
        { startTime, endTime },
      )
      .getOne();

    if (roomConflict) {
      throw new BadRequestException('Room is already booked at this time');
    }
    const schedule = this.scheduleRepo.create({
      schoolClass,
      subject,
      teacher,
      room,
      dayOfWeek,
      startTime,
      endTime,
    });

    return this.scheduleRepo.save(schedule);
  }
}
