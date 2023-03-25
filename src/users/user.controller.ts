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
import { Profile } from './entities/user-profile.entity';
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
  @Post('follow')
  async follow(@Body() data) {
    return this.userService.follow(data);
  }
  @Delete('unfollow')
  async unfollow(@Body() data) {
    return this.userService.unfollow(data);
  }

  @Get()
  @ApiOperation({ summary: 'Find all users' })
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find user' })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Profile> {
    return await this.userService.findById(id);
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
