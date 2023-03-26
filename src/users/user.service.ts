import {
  ConflictException,
  forwardRef,
  HttpException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';

import { AuthService } from '../auth/auth.service';
import { PrismaService } from '../prisma.service';
import { AccessToken } from '../token/dto/access-token.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    @Inject(forwardRef(() => AuthService))
    private authService: AuthService,
  ) {}

  async create(CreateUserDto: CreateUserDto): Promise<AccessToken> {
    const userExists = await this.findByEmail(CreateUserDto.email);
    if (userExists?.email == CreateUserDto.email) {
      throw new ConflictException('user already exists');
    }

    const data = {
      ...CreateUserDto,
      password: await bcrypt.hash(CreateUserDto.password, 10),
    };

    await this.prisma.user.create({
      data,
    });

    const token = await this.authService.login(CreateUserDto);

    return token;
  }

  async findAll(): Promise<User[] | null> {
    const users = await this.prisma.user.findMany();

    if (users.length == 0) {
      throw new NotFoundException('users not found');
    }
    return users;
  }

  async findByFilter(params: {
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

  async findById(id: number): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        _count: {
          select: {
            followedBy: true,
            following: true,
            posts: true,
            likePost: true,
          },
        },
      },
    });

    return user;
  }

  async findUserWithoutPasswordByEmail(email: string): Promise<User | null> {
    return;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  async update(id: number, data: UpdateUserDto): Promise<User> {
    return await this.prisma.user.update({
      data,
      where: {
        id,
      },
    });
  }

  async remove(id: number) {
    return this.prisma.user.delete({
      where: {
        id,
      },
    });
  }

  async follow(data) {
    return await this.prisma.user.update({
      where: { id: data.userId },
      data: {
        following: {
          create: [
            {
              followingId: data.userFollowingId,
            },
          ],
        },
      },
    });
  }

  async unfollow(data) {
    return await this.prisma.follows.delete({
      where: {
        followerId_followingId: {
          followerId: data.userId,
          followingId: data.userFollowingId,
        },
      },
    });
  }
}
