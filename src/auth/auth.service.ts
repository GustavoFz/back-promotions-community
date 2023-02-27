import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { UserWithoutPasswordDto } from '../auth/dto/withoutPassword-user.dto';
import { AccessToken } from '../token/dto/access-token.dto';
import { TokenService } from '../token/token.service';
import { UserService } from '../users/user.service';
import { AuthLogin } from './dto/login-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private tokenService: TokenService,
  ) {}

  async login(data: AuthLogin): Promise<AccessToken> {
    const user = await this.validateUser(data.email, data.password);

    const token = await this.createToken(user);
    return token;
  }

  async validateUser(
    email: string,
    password: string,
  ): Promise<UserWithoutPasswordDto> {
    const user = await this.userService.findByEmail(email);

    if (user) {
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (isPasswordValid) {
        const { password, ...result } = user;
        return result;
      }
    }
    return null;
  }

  async createToken(user: UserWithoutPasswordDto): Promise<AccessToken> {
    const { id, email, nickname, picture } = user;
    const payload = {
      id,
      email,
      nickname,
      picture,
    };

    const token = await this.jwtService.sign(payload);
    await this.tokenService.create(token, email);
    return {
      access_token: token,
    };
  }
}
