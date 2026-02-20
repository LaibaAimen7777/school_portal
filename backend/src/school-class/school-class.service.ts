import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SchoolClass } from './entities/school-class.entity';
import { privateDecrypt } from 'crypto';
import { Repository } from 'typeorm';
import { CreateClassDto } from './dto/create-class.dto';

@Injectable()
export class SchoolClassService {
  constructor(
    @InjectRepository(SchoolClass)
    private classRepository: Repository<SchoolClass>,
  ) {}

  async create(dto: CreateClassDto) {
    const existing = await this.classRepository.findOne({
      where: { grade: dto.grade, section: dto.section },
    });

    if (existing) {
      throw new BadRequestException('Class already exists');
    }

    const newClass = this.classRepository.create(dto);
    return this.classRepository.save(newClass);
  }

  async findByGrade(grade: number) {
    return this.classRepository.find({
      where: { grade },
      relations: ['students'],
    });
  }

  async getGrades() {
    const grades = await this.classRepository
      .createQueryBuilder('schoolClass')
      .select('DISTINCT schoolClass.grade', 'grade')
      .getRawMany();

    return grades.map((g) => ({
      id: g.grade,
      grade: g.grade,
    }));
  }

  async getSections(gradeId: number) {
    return this.classRepository
      .find({
        where: { grade: gradeId },
        relations: ['students'],
      })
      .then((classes) => {
        classes.map((cls) => ({
          id: cls.id,
          section: cls.section,
          currentStrength: cls.students.length,
          maxStrength: cls.maxStrength,
        }));
      });
  }
}
