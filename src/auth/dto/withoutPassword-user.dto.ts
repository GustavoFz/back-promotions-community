import { IsDate, IsEmail, IsInt, IsString, IsUrl } from 'class-validator';

export class UserWithoutPasswordDto {
  @IsInt()
  id: number;

  @IsString()
  nickname: string;

  @IsUrl()
  picture?: string;

  @IsEmail()
  email: string;

  @IsDate()
  createdAt: Date;
}
