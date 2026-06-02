// src/teachers/dto/create-teacher.dto.ts
import {
  IsString,
  IsOptional,
  IsDateString,
  IsArray,
  ValidateNested,
  IsInt,
  Min,
  Max,
} from 'class-validator';
import { Type } from 'class-transformer';

export class SubjectGradeDto {
  @IsInt()
  subjectId!: number;

  @IsInt()
  @Min(1)
  @Max(10)
  grade!: number;
}

export class CreateTeacherDto {
  @IsString()
  fullName!: string;

  @IsString()
  @IsOptional()
  qualification?: string;

  @IsDateString()
  @IsOptional()
  hireDate?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SubjectGradeDto)
  subjectGrades!: SubjectGradeDto[]; // replaces subjectIds
}
