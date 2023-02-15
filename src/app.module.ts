import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommentService } from './Comment/comment.service';
import { PostService } from './Post/post.service';
import { PrismaService } from './prisma.service';
import { UserService } from './User/user.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    AppService,
    UserService,
    PostService,
    CommentService,
    PrismaService,
  ],
})
export class AppModule {}
