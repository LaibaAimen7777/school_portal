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
  schoolStartTime?: string;

  @IsString()
  @IsOptional()
  @Matches(/^([01]\d|2[0-3]):[0-5]\d$/, {
    message: 'schoolEndTime must be in HH:MM format',
  })
  schoolEndTime?: string;

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

  @IsInt()
  @IsOptional()
  @Min(1)
  @Max(10)
  breakAfterPeriod?: number;

  @IsOptional()
  @IsString()
  @Matches(/^([01]\d|2[0-3]):[0-5]\d$/, {
    message: 'fridayEndTime must be in HH:MM format',
  })
  fridayEndTime?: string | null;
}
