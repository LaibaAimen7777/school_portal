import { IsInt, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateScheduleDto {
  @IsInt()
  @Type(() => Number)
  classId!: number;

  @IsInt()
  @Type(() => Number)
  subjectId!: number;

  @IsInt()
  @Type(() => Number)
  teacherId!: number;

  @IsInt()
  @Type(() => Number)
  roomId!: number;

  @IsString()
  dayOfWeek!: string;

  @IsString()
  startTime!: string;

  @IsString()
  endTime!: string;
}
