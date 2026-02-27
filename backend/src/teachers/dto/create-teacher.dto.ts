import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsDateString,
} from 'class-validator';

export class CreateTeacherDto {
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @IsString()
  @IsNotEmpty()
  qualification: string;

  @IsOptional()
  @IsString()
  specialization?: string;

  @IsOptional()
  @IsDateString()
  hireDate?: Date;
}
