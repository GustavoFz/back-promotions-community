import { BadRequestException, Injectable } from '@nestjs/common';
import { Post, Prisma } from '@prisma/client';

import { PrismaService } from '../prisma.service';
import { LikePostDto } from './dto/post-like.dto';

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.PostCreateInput): Promise<Post> {
    return this.prisma.post.create({
      data,
    });
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.PostWhereUniqueInput;
    where?: Prisma.PostWhereInput;
    include?: Prisma.PostInclude;
    orderBy?: Prisma.PostOrderByWithRelationInput;
  }): Promise<Post[]> {
    const { skip, take, cursor, where, include, orderBy } = params;
    return this.prisma.post.findMany({
      skip,
      take,
      cursor,
      where,
      include,
      orderBy,
    });
  }

  async findByFilter(
    search?: string,
    page?: number,
    limit?: number,
    sort?: string,
    order?: 'asc' | 'desc',
  ): Promise<Post[] | null> {
    if (search === null || search === undefined) {
      return this.prisma.post.findMany({
        skip: (page - 1) * limit,
        take: limit,
        orderBy: {
          [sort]: order,
        },
      });
    }

    return this.prisma.post.findMany({
      skip: (page - 1) * limit,
      take: limit,
      where: {
        OR: [
          { title: { contains: search } },
          { content: { contains: search } },
        ],
      },
      orderBy: {
        [sort]: order,
      },
    });
  }

  async findOne(
    postWhereUniqueInput: Prisma.PostWhereUniqueInput,
  ): Promise<Post | null> {
    return this.prisma.post.findUnique({
      where: postWhereUniqueInput,
      include: {
        user: true,
      },
    });
  }

  async update(params: {
    id: number;
    data: Prisma.PostUpdateInput;
  }): Promise<Post> {
    const { id, data } = params;
    return this.prisma.post.update({
      data,
      where: {
        id,
      },
    });
  }

  async remove(where: Prisma.PostWhereUniqueInput): Promise<Post> {
    return this.prisma.post.delete({
      where,
    });
  }

  async createLikePost(data: LikePostDto) {
    const like = await this.findLikePost(data);

    if (!like) {
      return await this.prisma.likePost.create({ data });
    }

    if (like.type !== data.type) {
      return this.updateLikePost(data);
    }

    throw new BadRequestException('Post already liked');
  }

  async updateLikePost(data: LikePostDto) {
    return await this.prisma.likePost.update({
      data: { type: data.type },
      where: { postId_userId: { postId: data.postId, userId: data.userId } },
    });
  }

  async removeLikePost(data: LikePostDto) {
    const likeExists = await this.findLikePost(data);
    console.log(likeExists);

    if (!likeExists) {
      throw new BadRequestException('Post not liked');
    }
    await this.prisma.likePost.delete({
      where: {
        postId_userId: {
          postId: data.postId,
          userId: data.userId,
        },
      },
    });
  }

  async findLikePost(data: LikePostDto) {
    return await this.prisma.likePost.findUnique({
      where: {
        postId_userId: {
          postId: data.postId,
          userId: data.userId,
        },
      },
    });
  }
}
