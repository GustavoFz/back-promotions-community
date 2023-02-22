import { Body, Controller, Delete, Post } from '@nestjs/common';
import { LikePostDto } from './dto/post-like.dto';

import { LikesService } from './likes.service';

@Controller('likes')
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  @Post('post')
  create(@Body() data: LikePostDto) {
    return this.likesService.createLikePost(data);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.likesService.findOne(+id);
  // }

  @Delete('post')
  remove(@Body() data: LikePostDto) {
    return this.likesService.removeLikePost(data);
  }
}
