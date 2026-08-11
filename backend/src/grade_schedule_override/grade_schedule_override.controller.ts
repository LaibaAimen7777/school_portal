import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { GradeOverrideService } from './grade_schedule_override.service';

import {
  CreateGradeOverrideDto,
  UpdateGradeOverrideDto,
} from './dto/gradeOverride.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';

@Controller('school-config/grade-overrides')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN')
export class GradeOverrideController {
  constructor(private readonly gradeOverrideService: GradeOverrideService) {}

  /**
   * GET /school-config/grade-overrides
   * Returns all grade overrides sorted by grade ascending.
   */
  @Get()
  findAll() {
    return this.gradeOverrideService.findAll();
  }

  /**
   * GET /school-config/grade-overrides/:grade
   * Returns the override for a specific grade, or 404.
   */
  @Get(':grade')
  findOne(@Param('grade', ParseIntPipe) grade: number) {
    return this.gradeOverrideService.findByGrade(grade);
  }

  /**
   * POST /school-config/grade-overrides
   * Body: { grade, endTime?, fridayEndTime? }
   * At least one of endTime / fridayEndTime is required.
   */
  @Post()
  create(@Body() dto: CreateGradeOverrideDto) {
    return this.gradeOverrideService.create(dto);
  }

  /**
   * PATCH /school-config/grade-overrides/:grade
   * Partially updates an existing override.
   * Send null for a field to clear it (as long as the other field stays set).
   */
  @Patch(':grade')
  update(
    @Param('grade', ParseIntPipe) grade: number,
    @Body() dto: UpdateGradeOverrideDto,
  ) {
    return this.gradeOverrideService.update(grade, dto);
  }

  /**
   * DELETE /school-config/grade-overrides/:grade
   * Removes the override entirely. The grade falls back to school defaults.
   */
  @Delete(':grade')
  remove(@Param('grade', ParseIntPipe) grade: number) {
    return this.gradeOverrideService.remove(grade);
  }
}
