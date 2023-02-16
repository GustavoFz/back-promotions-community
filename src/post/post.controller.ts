import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { PostService } from './post.service';

import { ApiTags } from '@nestjs/swagger';
import { Post as PostModelPrisma } from '@prisma/client';

@ApiTags('Posts')
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  async create(
    @Body() createPostDto: PostModelPrisma,
  ): Promise<PostModelPrisma> {
    const { title, content, userId, image, price, link, company } =
      createPostDto;
    return this.postService.create({
      title,
      content,
      user: {
        connect: {
          id: userId,
        },
      },
      image,
      price,
      link,
      company,
    });
  }

  @Get()
  async findAll(): Promise<PostModelPrisma[]> {
    return this.postService.findAll({
      include: {
        user: true,
      },
    });
  }

  @Get('filter/:search')
  async findWithFilter(
    @Param('search') search: string,
  ): Promise<PostModelPrisma[]> {
    return this.postService.findAll({
      where: {
        OR: [
          {
            title: { contains: search },
          },
          {
            content: { contains: search },
          },
        ],
      },
    });
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
