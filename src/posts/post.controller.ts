import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { PostService } from './post.service';

import { ApiTags } from '@nestjs/swagger';
import { Post as PostModelPrisma } from '@prisma/client';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { TokenService } from '../token/token.service';
import { CreatePostDto } from './dto/create-post.dto';
import { LikePostDto } from './dto/post-like.dto';
import { PostEntity } from './entities/post.entity';
import { ParseIntPipeIgnoreNull } from '../pipes/parse-int.pipe';

@ApiTags('Posts')
@Controller('post')
export class PostController {
  constructor(
    private readonly postService: PostService,
    private tokenService: TokenService,
  ) {}

  @Post()
  async create(@Body() createPostDto: CreatePostDto): Promise<PostEntity> {
    const { title, content, userId, image, price, link, company, categoryId } =
      createPostDto;
    return this.postService.create({
      title,
      content,
      user: {
        connect: {
          id: userId,
        },
      },
      category: {
        connect: {
          id: categoryId,
        },
      },
      image,
      price,
      link,
      company,
    });
  }

  @Get()
  async findByFilter(
    @Query('search') search: string,
    @Query('page', ParseIntPipeIgnoreNull) page = 1,
    @Query('limit', ParseIntPipeIgnoreNull) limit = 10,
    @Query('sort') sort = 'createdAt',
    @Query('order') order: 'asc' | 'desc' = 'desc',
  ): Promise<PostModelPrisma[]> {
    return this.postService.findByFilter(search, page, limit, sort, order);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<PostModelPrisma> {
    return this.postService.findOne({ id: Number(id) });
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() data: CreatePostDto,
  ): Promise<PostModelPrisma> {
    return this.postService.update({ id: Number(id), data });
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<PostModelPrisma> {
    return this.postService.remove({ id: Number(id) });
  }

  @UseGuards(JwtAuthGuard)
  @Post('like')
  async createLikePost(
    @Body() data: LikePostDto,
    @Headers('Authorization') token: string,
  ) {
    const user = await this.tokenService.getUserByToken(token);
    return await this.postService.createLikePost({ ...data, userId: user.id });
  }

  @UseGuards(JwtAuthGuard)
  @Delete('like')
  async removeLikePost(
    @Body() data: LikePostDto,
    @Headers('Authorization') token: string,
  ) {
    const user = await this.tokenService.getUserByToken(token);
    return await this.postService.removeLikePost({ ...data, userId: user.id });
  }
}
