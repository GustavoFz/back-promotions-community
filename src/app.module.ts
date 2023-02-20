import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { CommentModule } from './comments/comment.module';
import { PostModule } from './posts/post.module';
import { PrismaService } from './prisma.service';
import { UserModule } from './users/user.module';
import { TokenModule } from './token/token.module';

@Module({
  imports: [CommentModule, PostModule, UserModule, AuthModule, TokenModule],
  controllers: [AppController],
  providers: [PrismaService],
})
export class AppModule {}
