import { Injectable } from '@nestjs/common';
import { Post, Prisma } from '@prisma/client';

import { PrismaService } from 'src/prisma.service';

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
}
