import {
  Controller,
  Query,
  Get,
  UseGuards,
  Req,
  Post,
  Param,
  Body,
} from '@nestjs/common';
import { ParentService } from './parent.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { UserRole } from 'src/users/entities/user.entity';

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

  @Post(':id/reset-password')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  async resetPassword(@Param('id') id: number) {
    return this.parentService.resetParentPassword(Number(id));
  }

  @Get()
  async getAllParents() {
    return this.parentService.findAll();
  }

  @Post('change-password')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.PARENT)
  async changePassword(@Req() req, @Body('password') password: string) {
    const userId = req.user.id;

    return this.parentService.changePassword(userId, password);
  }
}
