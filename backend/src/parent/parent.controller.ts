import { Controller, Query, Get } from '@nestjs/common';
import { ParentService } from './parent.service';

@Controller('parent')
export class ParentController {
  constructor(private readonly parentService: ParentService) {}
  @Get('by-phone')
  getByPhone(@Query('phone') phone: string) {
    return this.parentService.findByPhone(phone);
  }
}
