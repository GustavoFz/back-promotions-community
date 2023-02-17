import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';

import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { LocalStrategy } from './auth/strategies/local.strategy';

@ApiTags('Home')
@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @Get('')
  hello() {
    return 'Hello World!';
  }

  @UseGuards(LocalStrategy)
  @Post('auth/login')
  async login(@Req() req: Request) {
    return this.authService.login(req.body);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Req() req: Request) {
    return 'Profile';
  }
}
