import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CommentService } from './comment.service';

import { ApiTags } from '@nestjs/swagger';
import { Comment as CommentModelPrisma } from '@prisma/client';
import { LikeCommentDto } from './dto/comment-like.dto';

@ApiTags('Comments')
@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  async create(@Body() createCommentDto): Promise<CommentModelPrisma> {
    return this.commentService.create(createCommentDto);
  }

  @Get()
  async findAll(): Promise<CommentModelPrisma[]> {
    return this.commentService.findAll({});
  }

  @Get('post/:id')
  async findAllByPost(@Param('id') id: string): Promise<CommentModelPrisma[]> {
    return this.commentService.findAll({
      where: { postId: Number(id) },
      include: {
        user: {
          select: {
            id: true,
            nickname: true,
            picture: true,
          },
        },
      },
    });
  }

  @Get('user/:id')
  async findAllByUser(@Param('id') id: string): Promise<CommentModelPrisma[]> {
    return this.commentService.findAll({
      where: { userId: Number(id) },
    });
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<CommentModelPrisma> {
    return this.commentService.findOne({ id: Number(id) });
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() data: CommentModelPrisma,
  ): Promise<CommentModelPrisma> {
    return this.commentService.update({ id: Number(id), data });
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<CommentModelPrisma> {
    return this.commentService.remove({ id: Number(id) });
  }

  @Post('comment')
  createLikeComment(@Body() data: LikeCommentDto) {
    return this.commentService.createLike(data);
  }

  @Delete('comment')
  removeLikeComment(@Body() data: LikeCommentDto) {
    return this.commentService.removeLike(data);
  }
}
