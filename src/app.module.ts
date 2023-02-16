import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { CommentModule } from './comment/comment.module';
import { PostModule } from './post/post.module';
import { PrismaService } from './prisma.service';
import { UserModule } from './user/user.module';

@Module({
  imports: [CommentModule, PostModule, UserModule],
  controllers: [AppController],
  providers: [PrismaService],
})
export class AppModule {}
