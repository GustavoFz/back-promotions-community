import { IsEmail, IsString } from 'class-validator';

export class AuthValidate {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
