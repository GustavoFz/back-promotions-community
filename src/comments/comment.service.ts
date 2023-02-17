import { Injectable } from '@nestjs/common';
import { Comment, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CommentService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.CommentCreateInput): Promise<Comment> {
    return this.prisma.comment.create({
      data,
    });
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.CommentWhereUniqueInput;
    where?: Prisma.CommentWhereInput;
    include?: Prisma.CommentInclude;
    orderBy?: Prisma.CommentOrderByWithRelationInput;
  }): Promise<Comment[]> {
    const { skip, take, cursor, where, include, orderBy } = params;
    return this.prisma.comment.findMany({
      skip,
      take,
      cursor,
      where,
      include,
      orderBy,
    });
  }

  async findOne(id: Prisma.UserWhereUniqueInput): Promise<Comment | null> {
    return this.prisma.comment.findUnique({
      where: id,
    });
  }

  async update(params: {
    id: number;
    data: Prisma.CommentUpdateInput;
  }): Promise<Comment> {
    const { id, data } = params;
    return this.prisma.comment.update({
      data,
      where: {
        id,
      },
    });
  }

  async remove(where: Prisma.CommentWhereUniqueInput): Promise<Comment> {
    return this.prisma.comment.delete({
      where,
    });
  }
}
