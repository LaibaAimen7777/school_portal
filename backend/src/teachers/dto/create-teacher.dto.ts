import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsDateString,
  IsArray,
  IsInt,
} from 'class-validator';

import { Type } from 'class-transformer';

export class CreateTeacherDto {
  @IsString()
  @IsNotEmpty()
  fullName!: string;

  @IsString()
  @IsNotEmpty()
  qualification!: string;

  // @IsOptional()
  // @IsString()
  // specialization?: string;

  @IsOptional()
  @IsDateString()
  hireDate?: Date;

  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  @Type(() => Number)
  subjectIds?: number[];
}
