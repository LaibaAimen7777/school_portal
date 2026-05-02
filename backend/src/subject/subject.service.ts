// src/subject/subject.service.ts
import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subject } from './entities/subject.entity';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import { Teacher } from 'src/teachers/entities/teacher.entity';

@Injectable()
export class SubjectService {
  constructor(
    @InjectRepository(Subject)
    private subjectRepo: Repository<Subject>,
    @InjectRepository(Teacher)
    private teacherRepo: Repository<Teacher>,
  ) {}

  async create(dto: CreateSubjectDto) {
    // Check duplicate name within same grades
    const existing = await this.subjectRepo.findOne({
      where: { name: dto.name },
    });
    if (existing) {
      throw new BadRequestException(
        `Subject "${dto.name}" already exists. Edit it to change its grades.`,
      );
    }

    return this.subjectRepo.save(this.subjectRepo.create({ ...dto }));
  }

  // All subjects, optionally filtered by grade
  async findAll(grade?: number) {
    const all = await this.subjectRepo.find({
      where: { isActive: true },
      relations: ['teachers'],
      order: { name: 'ASC' },
    });

    if (grade) {
      return all.filter((s) => s.grades.map(Number).includes(Number(grade)));
    }

    return all;
  }

  async findGroupedByGrade() {
    const subjects = await this.subjectRepo.find({
      where: { isActive: true },
      relations: ['teachers'],
      order: { name: 'ASC' },
    });

    const allGrades = [
      ...new Set(subjects.flatMap((s) => s.grades.map(Number))),
    ].sort((a, b) => a - b);

    return allGrades.map((grade) => ({
      grade,
      subjects: subjects
        .filter((s) => s.grades.map(Number).includes(grade))
        .map((s) => ({
          id: s.id,
          name: s.name,
          grades: s.grades.map(Number),
          teacherCount: s.teachers?.length ?? 0,
          teachers: s.teachers?.map((t) => ({
            id: t.id,
            fullName: t.fullName,
          })),
        })),
    }));
  }

  async findOne(id: number) {
    const subject = await this.subjectRepo.findOne({
      where: { id },
      relations: ['teachers'],
    });
    if (!subject) throw new NotFoundException('Subject not found');
    return subject;
  }

  async update(id: number, dto: UpdateSubjectDto) {
    const subject = await this.findOne(id);

    if (dto.name) subject.name = dto.name;
    if (dto.isActive !== undefined) subject.isActive = dto.isActive;
    if (dto.grades) subject.grades = [...new Set(dto.grades)]; // dedupe just in case

    return this.subjectRepo.save(subject);
  }

  // Soft delete — keeps historical schedule/exam data intact
  async remove(id: number) {
    const subject = await this.findOne(id);

    // Warn if teachers are assigned
    if (subject.teachers?.length > 0) {
      throw new BadRequestException(
        `Cannot delete subject with ${subject.teachers.length} teacher(s) assigned. ` +
          `Remove teacher assignments first.`,
      );
    }

    subject.isActive = false;
    await this.subjectRepo.save(subject);
    return { message: 'Subject deactivated successfully' };
  }

  async updateGrades(id: number, grades: number[]) {
    const subject = await this.findOne(id);
    subject.grades = [...new Set(grades)];
    return this.subjectRepo.save(subject);
  }
}
