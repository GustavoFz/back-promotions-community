import Prisma from '@prisma/client';
import { IsDate, IsEmail, IsInt, IsString, IsUrl } from 'class-validator';

export class UserDto implements Prisma.User {
  @IsInt()
  id: number;

  @IsString()
  nickname: string;

  @IsUrl()
  picture: string;

  @IsEmail()
  email: string;

  password: string;

  @IsDate()
  createdAt: Date;
}
