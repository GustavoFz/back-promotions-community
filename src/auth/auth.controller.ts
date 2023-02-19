import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';

import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() user: User) {
    return this.authService.login(user);
  }
}
