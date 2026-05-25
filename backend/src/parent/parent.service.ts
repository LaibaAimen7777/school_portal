import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Parent } from './entities/parent.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ParentService {
  constructor(
    @InjectRepository(Parent)
    private parentRepository: Repository<Parent>,
  ) {}

  async findByPhone(phone: string): Promise<Parent | null> {
    const parent = await this.parentRepository.findOne({
      where: { phone },
    });

    return parent || null;
  }
}
