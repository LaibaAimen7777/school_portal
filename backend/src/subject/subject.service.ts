import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subject } from './entities/subject.entity';

@Injectable()
export class SubjectService {
  constructor(
    @InjectRepository(Subject)
    private readonly subjectRepository: Repository<Subject>,
  ) {}

  async create(name: string, code: string) {
    const subject = this.subjectRepository.create({ name, code });
    return this.subjectRepository.save(subject);
  }

  async findAll() {
    return this.subjectRepository.find();
  }

  async findByIds(ids: number[]) {
    return this.subjectRepository.findByIds(ids);
  }
}
