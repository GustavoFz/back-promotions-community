import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { CommentModule } from './comments/comment.module';
import { PostModule } from './posts/post.module';
import { PrismaService } from './prisma.service';
import { UserModule } from './users/user.module';

@Module({
  imports: [CommentModule, PostModule, UserModule, AuthModule],
  controllers: [AppController],
  providers: [PrismaService],
})
export class AppModule {}
