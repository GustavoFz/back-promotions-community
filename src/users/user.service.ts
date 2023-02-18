import { HttpException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';

import { PrismaService } from 'src/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(CreateUserDto: CreateUserDto): Promise<User> {
    const userExists = await this.findOne({ email: CreateUserDto.email });
    if (userExists?.email == CreateUserDto.email) {
      throw new HttpException('user already exists', 202);
    }

    const data = {
      ...CreateUserDto,
      password: await bcrypt.hash(CreateUserDto.password, 10),
    };

    const createUser = await this.prisma.user.create({
      data,
    });

    return { ...createUser, password: undefined };
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserWhereUniqueInput;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }): Promise<User[] | null> {
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

  async findOne(id: Prisma.UserWhereUniqueInput): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: id,
    });
  }
  async findByEmail(email: Prisma.UserWhereUniqueInput): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: email,
    });
  }

  async update(params: { id: number; data: UpdateUserDto }): Promise<User> {
    const { id, data } = params;
    return this.prisma.user.update({
      data,
      where: {
        id,
      },
    });
  }

  async remove(id: Prisma.UserWhereUniqueInput): Promise<User> {
    return this.prisma.user.delete({
      where: {
        id: Number(id),
      },
    });
  }
}