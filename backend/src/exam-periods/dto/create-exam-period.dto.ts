// exam-periods/dto/create-exam-period.dto.ts
import {
  IsString,
  IsEnum,
  IsInt,
  IsDateString,
  Min,
  Max,
} from 'class-validator';
import {
  ExamTermType,
  TERM_DEFAULT_DURATIONS,
} from '../entities/exam-periods.entity';

export class CreateExamPeriodDto {
  @IsString()
  name!: string;

  @IsEnum(ExamTermType)
  examType!: ExamTermType;

  // Optional override — if not provided, defaults to TERM_DEFAULT_DURATIONS[examType]
  @IsInt()
  @Min(30)
  @Max(300)
  durationMinutes?: number;

  @IsDateString()
  startDate!: string;

  @IsDateString()
  endDate!: string;
}
