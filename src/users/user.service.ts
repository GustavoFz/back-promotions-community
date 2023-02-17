import { HttpException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateUserDto): Promise<UserDto> {
    const userExists = await this.findOne({ email: data.email });
    if (userExists?.email == data.email) {
      throw new HttpException('user already exists', 202);
    }

    return await this.prisma.user.create({
      data,
    });
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserWhereUniqueInput;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }): Promise<UserDto[] | null> {
    const { skip, take, cursor, where, orderBy } = params;
    const users = await this.prisma.user.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });

    if (users.length == 0) {
      throw new HttpException('users not found', 404);
    }
    return users;
  }

  async findOne(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<UserDto | null> {
    return this.prisma.user.findUnique({
      where: userWhereUniqueInput,
    });
  }

  async update(params: { id: number; data: UpdateUserDto }): Promise<UserDto> {
    const { id, data } = params;
    return this.prisma.user.update({
      data,
      where: {
        id,
      },
    });
  }

  async remove(id: Prisma.UserWhereUniqueInput): Promise<UserDto> {
    return this.prisma.user.delete({
      where: {
        id: Number(id),
      },
    });
  }
}
