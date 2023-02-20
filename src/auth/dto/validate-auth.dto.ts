import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class AuthValidate {
  @ApiProperty({
    example: 'gustavofrancosolidktech.com',
  })
  @IsNotEmpty({ message: 'Email is required.' })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'YOUR PASSWORD HERE',
  })
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  //@Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
  //  message: 'password too weak',
  //})
  password: string;
}
