import { IsEmail, IsString } from 'class-validator';
import { User } from 'src/users/entities/user.entity';

export class AuthValidate implements Partial<User> {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
