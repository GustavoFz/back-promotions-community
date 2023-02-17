import { Prisma } from '@prisma/client';
import { IsEmail, IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class CreateUserDto implements Prisma.UserCreateInput {
  @IsNotEmpty({ message: 'Name is required.' })
  @IsString()
  nickname: string;

  @IsUrl()
  picture?: string;

  @IsNotEmpty({ message: 'Email is required.' })
  @IsEmail()
  email: string;

  posts?: Prisma.PostCreateNestedManyWithoutUserInput;
  comments?: Prisma.CommentCreateNestedManyWithoutUserInput;
  createdAt?: string | Date;
}
