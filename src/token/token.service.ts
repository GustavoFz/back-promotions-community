import {
  forwardRef,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { PrismaService } from 'src/prisma.service';
import { User } from 'src/users/entities/user.entity';
import { CreateTokenDto } from './dto/create-token.dto';
import { TokenDto } from './entities/token.entity';

@Injectable()
export class TokenService {
  constructor(
    private prisma: PrismaService,
    @Inject(forwardRef(() => AuthService))
    private authService: AuthService,
  ) {}

  async create(CreateToken: CreateTokenDto) {
    const objToken = await this.prisma.token.findUnique({
      where: { email: CreateToken.email },
    });
    if (objToken) {
      await this.prisma.token.update({
        where: { email: CreateToken.email },
        data: { hash: CreateToken.hash },
      });
    } else {
      await this.prisma.token.create({
        data: { email: CreateToken.email, hash: CreateToken.hash },
      });
    }
  }

  async refreshToken(oldToken: string) {
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

  async getUserByToken(token: string): Promise<User> {
    token = token.replace('Bearer ', '').trim();
    const objToken: TokenDto = await this.prisma.token.findFirst({
      where: { hash: token },
    });
    if (objToken) {
      const user = await this.prisma.user.findUnique({
        where: { email: objToken.email },
      });
      return user;
    }
    return null;
  }
}
