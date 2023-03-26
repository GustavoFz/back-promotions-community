import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { TokenModule } from '../token/token.module';
import { PostController } from './post.controller';
import { PostService } from './post.service';

@Module({
  imports: [TokenModule],
  controllers: [PostController],
  providers: [PostService, PrismaService],
})
export class PostModule {}
