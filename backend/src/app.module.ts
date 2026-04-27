import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { SchoolClassModule } from './school-class/school-class.module';
import { StudentModule } from './student/student.module';
import { ParentModule } from './parent/parent.module';
import { TeachersModule } from './teachers/teachers.module';
import { SubjectModule } from './subject/subject.module';
import { ScheduleModule } from './schedule/schedule.module';
import { RoomsModule } from './rooms/rooms.module';
import { AttendanceController } from './attendance/attendance.controller';
import { AttendanceModule } from './attendance/attendance.module';
import { AssignmentsController } from './assignments/assignments.controller';
import { AssignmentsService } from './assignments/assignments.service';
import { AssignmentsModule } from './assignments/assignments.module';
import { SubmissionsModule } from './submissions/submissions.module';
import { ExamsController } from './exams/exams.controller';
import { ExamsService } from './exams/exams.service';
import { ExamsModule } from './exams/exams.module';
import { MarksModule } from './marks/marks.module';
import { SchoolConfigModule } from './school-config/school-config.module';
import { ExamPeriodsModule } from './exam-periods/exam-periods.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '3306'),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      migrations: [__dirname + '/migrations/*{.ts,.js}'],
      synchronize: false,
      migrationsRun: false,
    }),
    UsersModule,
    AuthModule,
    SchoolClassModule,
    StudentModule,
    ParentModule,
    TeachersModule,
    SubjectModule,
    ScheduleModule,
    RoomsModule,
    AttendanceModule,
    AssignmentsModule,
    SubmissionsModule,
    ExamsModule,
    MarksModule,
    SchoolConfigModule,
    ExamPeriodsModule,
  ],
  // controllers: [AttendanceController, AssignmentsController, ExamsController],
  // providers: [AssignmentsService, ExamsService],
  // controllers: [AppController],
  // providers: [AppService],
})
export class AppModule {}
