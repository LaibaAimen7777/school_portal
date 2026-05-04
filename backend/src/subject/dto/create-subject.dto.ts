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

export class CreateSubjectDto {
  @IsString()
  name!: string;

  @IsString()
  code!: string;

  // e.g. [9, 10] means this subject is for Grade 9 and 10 only
  @IsArray()
  @ArrayNotEmpty()
  @IsInt({ each: true })
  grades!: number[];

  @IsInt()
  @IsOptional()
  @Min(1)
  @Max(10)
  periodsPerWeek?: number;
}
