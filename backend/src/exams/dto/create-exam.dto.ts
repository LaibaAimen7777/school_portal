// exams/dto/create-exam.dto.ts
import {
  IsInt,
  IsDateString,
  IsString,
  IsEnum,
  Matches,
} from 'class-validator';

export enum ExamType {
  MIDTERM = 'MIDTERM',
  FINAL = 'FINAL',
  QUIZ = 'QUIZ',
  PRACTICAL = 'PRACTICAL',
}

export class CreateExamDto {
  @IsInt()
  classId!: number;

  @IsInt()
  subjectId!: number;

  @IsInt()
  teacherId!: number;

  @IsInt()
  roomId!: number;

  @IsInt()
  examPeriodId!: number;

  @IsDateString()
  date!: string; // "2025-10-15"

  @IsString()
  @Matches(/^([01]\d|2[0-3]):[0-5]\d$/, {
    message: 'startTime must be in HH:MM format',
  })
  startTime!: string; // "09:00"

  @IsString()
  @Matches(/^([01]\d|2[0-3]):[0-5]\d$/, {
    message: 'endTime must be in HH:MM format',
  })
  endTime!: string; // "11:00"

  @IsEnum(ExamType)
  examType!: ExamType;
}
