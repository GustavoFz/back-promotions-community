import Prisma from '@prisma/client';
import { IsDate, IsEmail, IsInt, IsString, IsUrl } from 'class-validator';

export class UserWithoutPasswordDto implements Partial<Prisma.User> {
  @IsInt()
  id: number;

  @IsString()
  nickname: string;

  @IsUrl()
  picture: string;

  @IsEmail()
  email: string;

  @IsDate()
  createdAt: Date;
}
