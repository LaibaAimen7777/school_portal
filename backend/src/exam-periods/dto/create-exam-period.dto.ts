// exam-periods/dto/create-exam-period.dto.ts
import {
  IsString,
  IsDateString,
  IsBoolean,
  IsOptional,
  ValidationArguments,
  registerDecorator,
  ValidationOptions,
} from 'class-validator';

function IsAfterDate(property: string, options?: ValidationOptions) {
  return (object: object, propertyName: string) => {
    registerDecorator({
      name: 'isAfterDate',
      target: object.constructor,
      propertyName,
      constraints: [property],
      options,
      validator: {
        validate(value: string, args: ValidationArguments) {
          const [relatedField] = args.constraints;
          const relatedValue = (args.object as any)[relatedField];
          if (!value || !relatedValue) return true;
          return value > relatedValue;
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must be after ${args.constraints[0]}`;
        },
      },
    });
  };
}

export class CreateExamPeriodDto {
  @IsString()
  name!: string;

  @IsDateString()
  startDate!: string;

  @IsDateString()
  @IsAfterDate('startDate')
  endDate!: string;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
