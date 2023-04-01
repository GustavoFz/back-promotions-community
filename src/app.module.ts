import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { CommentModule } from './comments/comment.module';
import { PostModule } from './posts/post.module';
import { PrismaService } from './prisma.service';
import { TokenModule } from './token/token.module';
import { UserModule } from './users/user.module';
import { CategoriesModule } from './categories/categories.module';
import { GenericService } from './generic/generic.service';

@Module({
  imports: [CommentModule, PostModule, UserModule, AuthModule, TokenModule, CategoriesModule],
  controllers: [AppController],
  providers: [PrismaService, GenericService],
})
export class AppModule {}
