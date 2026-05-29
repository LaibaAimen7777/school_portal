import { Controller, Query, Get, UseGuards, Req } from '@nestjs/common';
import { ParentService } from './parent.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';

@Controller('parent')
export class ParentController {
  constructor(private readonly parentService: ParentService) {}

  @Get('by-phone')
  getByPhone(@Query('phone') phone: string) {
    return this.parentService.findByPhone(phone);
  }
  @Get('portal')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('parent')
  getPortal(@Req() req: any) {
    return this.parentService.getPortalData(req.user.id);
  }
}
