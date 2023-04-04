import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  Headers,
  HttpCode,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UnprocessableEntityException,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ParseIntPipeIgnoreNull } from '../pipes/parse-int.pipe';
import { AccessToken } from '../token/dto/access-token.dto';
import { TokenService } from '../token/token.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Profile } from './entities/user-profile.entity';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private tokenService: TokenService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create user' })
  async create(@Body() data: CreateUserDto): Promise<AccessToken> {
    return this.userService.create(data);
  }

  @UseGuards(JwtAuthGuard)
  @Post('follow/:id')
  async follow(
    @Param('id', ParseIntPipe) id: number,
    @Headers('Authorization') token: string,
  ) {
    const user = await this.tokenService.getUserByToken(token);

    const existFolow = await this.userService.existFolow({
      followedId: id,
      followerId: user.id,
    });

    if (id === user.id) {
      throw new BadRequestException('You cannot follow yourself');
    }

    if (existFolow) {
      throw new ConflictException('The user is already being followed');
    }

    return await this.userService.follow({
      userId: user.id,
      followedId: id,
    });
  }

  @UseGuards(JwtAuthGuard)
  @HttpCode(204)
  @Delete('follow/:id')
  async unfollow(
    @Param('id', ParseIntPipe) id: number,
    @Headers('Authorization') token: string,
  ) {
    const user = await this.tokenService.getUserByToken(token);

    const existFolow = await this.userService.existFolow({
      followedId: id,
      followerId: user.id,
    });

    if (id === user.id) {
      throw new BadRequestException('You cannot follow yourself');
    }

    if (!existFolow) {
      throw new UnprocessableEntityException('You are not following this user');
    }

    console.log(id, user.id);
    return await this.userService.unfollow({
      userId: user.id,
      followedId: id,
    });
  }

  @Get()
  @ApiOperation({ summary: 'Find all users' })
  async findAll(
    @Headers('Authorization') token?,
    @Query('page', ParseIntPipeIgnoreNull) page = 1,
    @Query('limit', ParseIntPipeIgnoreNull) limit = 10,
    @Query('sort') sort = 'createdAt',
    @Query('order') order: 'asc' | 'desc' = 'desc',
  ) {
    if (token) {
      const user = await this.tokenService.getUserByToken(token);
      return this.userService.findAll(page, limit, sort, order, user?.id);
    }
    return this.userService.findAll(page, limit, sort, order);
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

  @HttpCode(204)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete user' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.userService.remove(id);
  }
}
