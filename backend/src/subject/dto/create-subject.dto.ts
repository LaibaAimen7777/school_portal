// src/subject/dto/create-subject.dto.ts
import {
  IsString,
  IsArray,
  ArrayNotEmpty,
  IsInt,
  IsOptional,
  IsBoolean,
  Max,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateSubjectDto {
  @IsString()
  name!: string;

  @IsString()
  code!: string;

  // e.g. [9, 10] means this subject is for Grade 9 and 10 only
  @IsArray()
  @ArrayNotEmpty()
  @Type(() => Number)
  @IsInt({ each: true })
  grades!: number[];

  @IsInt()
  @IsOptional()
  @Type(() => Number)
  @Min(1)
  @Max(10)
  periodsPerWeek?: number;
}
