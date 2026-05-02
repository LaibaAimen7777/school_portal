import { IsOptional, IsBoolean } from 'class-validator';

// src/subject/dto/update-subject.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { CreateSubjectDto } from './create-subject.dto';

export class UpdateSubjectDto extends PartialType(CreateSubjectDto) {
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
