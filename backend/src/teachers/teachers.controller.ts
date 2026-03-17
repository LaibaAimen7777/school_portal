import { Controller, UseGuards, Post, Body, Get, Req } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { UserRole } from 'src/users/entities/user.entity';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { TeachersService } from './teachers.service';

@Controller('teachers')
export class TeachersController {
  constructor(private teachersService: TeachersService) {}
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Post()
  create(@Body() dto: CreateTeacherDto) {
    return this.teachersService.create(dto);
  }

  @Get()
  findAll() {
    return this.teachersService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('dashboard')
  async getDashboard(@Req() req) {
    console.log(req.user);
    const userId = req.user.id;
    return this.teachersService.getDashboard(userId);
  }
}
