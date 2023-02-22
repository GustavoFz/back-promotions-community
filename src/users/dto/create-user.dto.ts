import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty({ example: 'user132' })
  @IsNotEmpty({ message: 'Nickname is required.' })
  @IsString()
  nickname: string;

  @ApiProperty({ example: 'https://google.com/picture.jpeg' })
  @IsOptional()
  @IsUrl()
  picture?: string;

  @ApiProperty({ example: 'usuario@provedor.com' })
  @IsNotEmpty({ message: 'Email is required.' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'IstoNãoÉUmaSenha123$%' })
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  password: string;
}
