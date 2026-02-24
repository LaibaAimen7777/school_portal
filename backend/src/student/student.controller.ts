import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  Get,
  Query,
} from '@nestjs/common';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { CreateStudentDto } from './dto/create-student.dto';
import { StudentService } from './student.service';
import { UserRole } from 'src/users/entities/user.entity';

@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Post()
  create(@Body() dto: CreateStudentDto) {
    console.log('Controller received:', dto);
    return this.studentService.create(dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Patch(':id/reset-password')
  resetPassword(@Param('id') id: number) {
    return this.studentService.resetPassword(Number(id));
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Get()
  async findAll(
    @Query('grade') grade?: number,
    @Query('section') section?: string,
  ) {
    console.log('here in sc in findAll');
    return this.studentService.findAll(grade, section);
  }

  @Patch(':id/change-class')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  async changeClass(@Param('id') id: number, @Body('classId') classId: number) {
    return this.studentService.updateClass(Number(id), classId);
  }
}
