import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() body: { identifier: string; password: string }) {
    console.log('body in back in auth controller:', body);
    return this.authService.login(body.identifier, body.password);
  }
}
