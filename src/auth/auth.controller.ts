import {
  Body,
  Controller,
  Delete,
  HttpCode,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { TokenService } from 'src/token/token.service';
import { User } from 'src/users/entities/user.entity';

import { AuthService } from './auth.service';
import { AuthLogin } from './dto/login-auth.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';

@ApiTags('Auth')
@Controller()
export class AuthController {
  constructor(
    private authService: AuthService,
    private tokenService: TokenService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @ApiBody({ type: AuthLogin })
  @HttpCode(200)
  @Post('login')
  async login(@Body() user: User) {
    return this.authService.login(user);
  }

  @Delete('logout')
  async logout(token: string) {
    return this.tokenService.delete(token);
  }
}
