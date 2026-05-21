import {
  IsString,
  IsNotEmpty,
  IsDateString,
  IsNumber,
  IsEnum,
} from 'class-validator';

export class CreateStudentDto {
  @IsString()
  @IsNotEmpty()
  firstName!: string;

  @IsString()
  @IsNotEmpty()
  lastName!: string;

  @IsDateString()
  dateOfBirth!: string;

  @IsEnum(['MALE', 'FEMALE'])
  gender!: string;

  @IsString()
  fatherName!: string;

  @IsString()
  motherName!: string;

  @IsString()
  phone!: string;

  @IsString()
  email!: string;

  @IsString()
  address!: string;

  @IsNumber()
  classId!: number;

  @IsNumber()
  joiningYear!: number;
}
