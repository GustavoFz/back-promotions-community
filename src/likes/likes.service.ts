import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { LikePostDto } from './dto/post-like.dto';

@Injectable()
export class LikesService {
  constructor(private prisma: PrismaService) {}

  async createLikePost(data: LikePostDto) {
    const likeExists = await this.existsLikePost(data);

    if (likeExists) {
      throw new BadRequestException('Post already liked');
    }
    return await this.prisma.likePost.create({ data });
  }

  async removeLikePost(data: LikePostDto) {
    const likeExists = await this.existsLikePost(data);

    if (!likeExists) {
      throw new BadRequestException('Post not liked');
    }
    await this.prisma.likePost.delete({
      where: { postId_userId: data },
    });
  }

  async existsLikePost(data: LikePostDto) {
    return await this.prisma.likePost.findUnique({
      where: {
        postId_userId: data,
      },
    });
  }
}
