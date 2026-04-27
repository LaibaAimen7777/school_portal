// src/school-config/school-config.controller.ts
import {
  Controller,
  Get,
  Patch,
  Body,
  NotFoundException,
} from '@nestjs/common';
import { SchoolConfigService } from './school-config.service';
import { UpdateSchoolConfigDto } from './dto/update-school-config.dto';

@Controller('school-config')
export class SchoolConfigController {
  constructor(private readonly schoolConfigService: SchoolConfigService) {}

  @Get()
  getConfig() {
    return this.schoolConfigService.getConfig();
  }

  @Get('timing-audit')
  async timingAudit() {
    const config = await this.schoolConfigService.getConfig();
    if (!config) throw new NotFoundException('School config not found');
    return this.schoolConfigService.auditSchedulesAgainstNewTiming(config);
  }

  @Patch()
  updateTiming(@Body() dto: UpdateSchoolConfigDto) {
    return this.schoolConfigService.updateTiming(dto);
  }
}
