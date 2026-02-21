export class CreateStudentDto {
  classId: number;
  joiningYear: number;

  // student
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;

  // parent
  fatherName: string;
  motherName: string;
  phone: string;
  email?: string;
  address: string;
}
