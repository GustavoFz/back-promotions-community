import { IsDate, IsEmail, IsInt, IsString, IsUrl } from 'class-validator';
import { User } from '../entities/user.entity';

export class userLoginDto extends User {
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
