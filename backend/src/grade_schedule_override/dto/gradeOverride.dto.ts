import {
  IsInt,
  IsOptional,
  IsString,
  Matches,
  Max,
  Min,
} from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

const TIME_REGEX = /^([01]\d|2[0-3]):[0-5]\d$/;
const TIME_MSG = 'Must be a valid HH:MM time string';

export class CreateGradeOverrideDto {
  @IsInt()
  @Min(1)
  @Max(10)
  grade!: number;

  // At least one of the two must be provided (enforced in the service)
  @IsOptional()
  @IsString()
  @Matches(TIME_REGEX, { message: TIME_MSG })
  endTime?: string | null;

  @IsOptional()
  @IsString()
  @Matches(TIME_REGEX, { message: TIME_MSG })
  fridayEndTime?: string | null;
}

export class UpdateGradeOverrideDto extends PartialType(
  CreateGradeOverrideDto,
) {}
