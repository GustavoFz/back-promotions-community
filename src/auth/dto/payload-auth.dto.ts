import Prisma from '@prisma/client';
import { IsEmail, IsInt } from 'class-validator';

export class AuthPayloadDto implements Partial<Prisma.User> {
  @IsInt()
  id: number;

  @IsEmail()
  email: string;
}
