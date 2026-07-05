import { Module } from '@nestjs/common';
import { StudentController } from './student.controller';
import { StudentService } from './student.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { SchoolClass } from 'src/school-class/entities/school-class.entity';
import { User } from 'src/users/entities/user.entity';
import { Parent } from 'src/parent/entities/parent.entity';
import { ParentModule } from 'src/parent/parent.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Student, SchoolClass, User, Parent]),
    ParentModule,
  ],
  controllers: [StudentController],
  providers: [StudentService],
})
export class StudentModule {}
