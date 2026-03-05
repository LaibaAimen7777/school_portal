export class CreateScheduleDto {
  classId: number;
  subjectId: number;
  teacherId: number;
  dayOfWeek: string;
  startTime: string;
  endTime: string;
}
