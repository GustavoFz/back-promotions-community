import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { UserWithoutPasswordDto } from 'src/users/dto/withoutPassword-user.dto';
import { User } from 'src/users/entities/user.entity';

import { UserService } from 'src/users/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(user: User) {
    const payload = {
      sub: user.id,
      email: user.email,
      nickname: user.nickname,
      picture: user.picture,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async validateUser(
    email: string,
    password: string,
  ): Promise<UserWithoutPasswordDto> {
    const user = await this.userService.findByEmail({ email });

    if (user) {
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (isPasswordValid) {
        const { password, ...result } = user;
        return result;
      }
    }

    return null;
  }
}
