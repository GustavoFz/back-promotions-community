import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { PostService } from './post.service';

import { ApiTags } from '@nestjs/swagger';
import { Post as PostModelPrisma } from '@prisma/client';
import { ParseIntPipeIgnoreNull } from './pipes/parse-int.pipe';

@ApiTags('Posts')
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  async create(
    @Body() createPostDto: PostModelPrisma,
  ): Promise<PostModelPrisma> {
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

  // @Get('all')
  // async findAll(): Promise<PostModelPrisma[]> {
  //   return this.postService.findAll({
  //     include: {
  //       user: true,
  //     },
  //   });
  // }

  @Get()
  async findByFilter(
    @Query('search') search: string,
    @Query('page', ParseIntPipeIgnoreNull) page: number = 1,
    @Query('limit', ParseIntPipeIgnoreNull) limit: number = 10,
    @Query('sort') sort: string = 'createdAt',
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
    @Body() data: PostModelPrisma,
  ): Promise<PostModelPrisma> {
    return this.postService.update({ id: Number(id), data });
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<PostModelPrisma> {
    return this.postService.remove({ id: Number(id) });
  }
}
