import { forwardRef, Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { PrismaService } from 'src/prisma.service';
import { UserModule } from 'src/users/user.module';
import { TokenController } from './token.controller';
import { TokenService } from './token.service';

@Module({
  imports: [UserModule, forwardRef(() => AuthModule)],
  controllers: [TokenController],
  providers: [TokenService, PrismaService],
  exports: [TokenService],
})
export class TokenModule {}
