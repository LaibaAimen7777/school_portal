// school-config/dto/update-school-config.dto.ts
import {
  IsString,
  IsInt,
  IsOptional,
  Min,
  Max,
  Matches,
} from 'class-validator';

export class UpdateSchoolConfigDto {
  @IsString()
  @IsOptional()
  @Matches(/^([01]\d|2[0-3]):[0-5]\d$/, {
    message: 'schoolStartTime must be in HH:MM format',
  })
  schoolStartTime?: string; // "08:00"

  @IsString()
  @IsOptional()
  @Matches(/^([01]\d|2[0-3]):[0-5]\d$/, {
    message: 'schoolEndTime must be in HH:MM format',
  })
  schoolEndTime?: string; // "15:00"

  @IsInt()
  @IsOptional()
  @Min(20)
  @Max(120)
  periodDurationMinutes?: number;

  @IsInt()
  @IsOptional()
  @Min(0)
  @Max(30)
  breakDurationMinutes?: number;
}
