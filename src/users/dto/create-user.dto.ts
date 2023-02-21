import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'Name is required.' })
  @IsString()
  nickname: string;

  @IsOptional()
  @IsUrl()
  picture?: string;

  @IsNotEmpty({ message: 'Email is required.' })
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  password: string;
}
