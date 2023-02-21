import {
  forwardRef,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { AuthService } from 'src/auth/auth.service';
import { PrismaService } from 'src/prisma.service';
import { AccessToken } from './dto/access-token.dto';

@Injectable()
export class TokenService {
  constructor(
    private prisma: PrismaService,
    @Inject(forwardRef(() => AuthService))
    private authService: AuthService,
  ) {}

  async create(hash: string, email: string) {
    const objToken = await this.prisma.token.findUnique({ where: { email } });

    if (objToken) {
      return await this.prisma.token.update({
        where: { email },
        data: { hash },
      });
    }

    return await this.prisma.token.create({ data: { email, hash } });
  }

  async delete(token: string) {
    await this.prisma.token.deleteMany({
      where: {
        hash: token,
      },
    });
  }

  async refreshToken(oldToken: string): Promise<AccessToken> {
    const objToken = await this.prisma.token.findFirst({
      where: { hash: oldToken },
    });
    if (objToken) {
      const user = await this.prisma.user.findUnique({
        where: { email: objToken.email },
      });
      return await this.authService.login(user);
    }

    throw new UnauthorizedException('Invalid Token');
  }

  // async getUserByToken(token: string): Promise<User> {
  //   token = token.replace('Bearer ', '').trim();
  //   const objToken: TokenDto = await this.prisma.token.findFirst({
  //     where: { hash: token },
  //   });
  //   if (objToken) {
  //     const user = await this.prisma.user.findUnique({
  //       where: { email: objToken.email },
  //     });
  //     return user;
  //   }
  //   return null;
  // }
}
