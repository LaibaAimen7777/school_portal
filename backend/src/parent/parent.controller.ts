import { Controller, Query, Get, UseGuards, Req } from '@nestjs/common';
import { ParentService } from './parent.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';

@Controller('parent')
export class ParentController {
  constructor(private readonly parentService: ParentService) {}

  @Get('by-phone')
  async getByPhone(@Query('phone') phone: string) {
    const parent = await this.parentService.findByPhoneWithChildren(phone);
    if (!parent) return null;

    return {
      fatherName: parent.fatherName,
      motherName: parent.motherName,
      email: parent.email,
      address: parent.address,
      children: parent.students.map((s) => ({
        id: s.id,
        firstName: s.firstName,
        lastName: s.lastName,
        grade: s.schoolClass?.grade,
        section: s.schoolClass?.section,
      })),
    };
  }
  @Get('portal')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('parent')
  getPortal(@Req() req: any) {
    return this.parentService.getPortalData(req.user.id);
  }
}
