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
import { TeacherSubjectGrade } from 'src/teachers/entities/teacher-subject-grade.entity';

@Injectable()
export class SubjectService {
  constructor(
    @InjectRepository(Subject)
    private subjectRepo: Repository<Subject>,

    @InjectRepository(TeacherSubjectGrade)
    private tsgRepo: Repository<TeacherSubjectGrade>,
  ) {}

  async create(dto: CreateSubjectDto) {
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

  async findAll(grade?: number) {
    const all = await this.subjectRepo.find({
      where: { isActive: true },
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
      order: { name: 'ASC' },
    });

    // Load all TSG rows for these subjects in one query
    const subjectIds = subjects.map((s) => s.id);
    const tsgs =
      subjectIds.length > 0
        ? await this.tsgRepo.find({
            where: subjectIds.map((id) => ({ subject: { id } })),
            relations: ['teacher', 'subject'],
          })
        : [];

    const allGrades = [
      ...new Set(subjects.flatMap((s) => s.grades.map(Number))),
    ].sort((a, b) => a - b);

    return allGrades.map((grade) => ({
      grade,
      subjects: subjects
        .filter((s) => s.grades.map(Number).includes(grade))
        .map((s) => {
          // Teachers for this subject at this specific grade
          const gradeTeachers = tsgs.filter(
            (tsg) => tsg.subject.id === s.id && tsg.grade === grade,
          );
          return {
            id: s.id,
            name: s.name,
            grades: s.grades.map(Number),
            teacherCount: gradeTeachers.length,
            teachers: gradeTeachers.map((tsg) => ({
              id: tsg.teacher.id,
              fullName: tsg.teacher.fullName,
            })),
          };
        }),
    }));
  }

  // subject.service.ts
  async findByGrade(grade: number) {
    const all = await this.subjectRepo.find({
      where: { isActive: true },
    });
    return all.filter(
      (s) => Array.isArray(s.grades) && s.grades.includes(grade),
    );
  }

  async findOne(id: number) {
    const subject = await this.subjectRepo.findOne({ where: { id } });
    if (!subject) throw new NotFoundException('Subject not found');
    return subject;
  }

  async update(id: number, dto: UpdateSubjectDto) {
    const subject = await this.findOne(id);
    if (dto.name) subject.name = dto.name;
    if (dto.isActive !== undefined) subject.isActive = dto.isActive;
    if (dto.grades) subject.grades = [...new Set(dto.grades)];
    return this.subjectRepo.save(subject);
  }

  async remove(id: number) {
    const subject = await this.findOne(id);

    // Check if any teachers are assigned via TSG
    const assignedCount = await this.tsgRepo.count({
      where: { subject: { id } },
    });
    if (assignedCount > 0) {
      throw new BadRequestException(
        `Cannot delete subject with ${assignedCount} teacher assignment(s). ` +
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
