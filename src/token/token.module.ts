import { forwardRef, Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { PrismaService } from '../prisma.service';
import { UserModule } from '../users/user.module';
import { TokenController } from './token.controller';
import { TokenService } from './token.service';

@Module({
  imports: [UserModule, forwardRef(() => AuthModule)],
  controllers: [TokenController],
  providers: [TokenService, PrismaService],
  exports: [TokenService],
})
export class TokenModule {}
