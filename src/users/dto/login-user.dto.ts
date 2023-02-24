import { IsDate, IsEmail, IsInt, IsString, IsUrl } from 'class-validator';
import { User } from '../entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';

export class userLoginDto extends User {
  @ApiProperty({ example: 1 })
  @IsInt()
  id: number;

  @ApiProperty({ example: 'nickname' })
  @IsString()
  nickname: string;

  @ApiProperty({ example: 'https://google.com/picture.png' })
  @IsUrl()
  picture: string;

  @ApiProperty({ example: 'example@company.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '2022-22-12 08:02:22' })
  @IsDate()
  createdAt: Date;
}
