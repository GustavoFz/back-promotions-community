import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class AuthLogin {
  @ApiProperty({ example: 'gustavofrancosolidktech.com' })
  @IsNotEmpty({ message: 'Email is required.' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'YOUR PASSWORD HERE' })
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  password: string;
}
