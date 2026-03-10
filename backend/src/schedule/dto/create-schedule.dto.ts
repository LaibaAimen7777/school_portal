export class CreateScheduleDto {
  classId: number;
  subjectId: number;
  teacherId: number;
  roomId: number;
  dayOfWeek: string;
  startTime: string;
  endTime: string;
  room: string;
}
