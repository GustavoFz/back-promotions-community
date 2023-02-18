import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';

import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';

@ApiTags('Home')
@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @Get('')
  hello() {
    return 'Hello World!';
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Req() req: Request) {
    return 'Profile';
  }
}
