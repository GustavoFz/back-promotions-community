import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AccessToken } from '../token/dto/access-token.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: 'Create user' })
  async create(@Body() data: CreateUserDto): Promise<AccessToken> {
    return this.userService.create(data);
  }

  @Get()
  @ApiOperation({ summary: 'Find all users' })
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find user' })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<User> {
    const followers = [1];
    const following = [2];
    const hotPosts = 10;
    const posts = 50;
    const thanks = 20;
    const likes = 10000;

    const user = await this.userService.findById(id);
    return {
      ...user,
      followers,
      following,
      hotPosts,
      posts,
      thanks,
      likes,
    };
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update user' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateUserDto,
  ): Promise<User> {
    return this.userService.update(id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete user' })
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.userService.remove(id);
  }
}
