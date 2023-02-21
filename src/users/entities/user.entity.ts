import { ApiProperty } from '@nestjs/swagger';

export class User {
  id: number;

  @ApiProperty({ example: 'Gustavo Franco' })
  nickname: string;

  @ApiProperty({ example: 'www.mypicture.com/picture3', required: false })
  picture?: string;

  @ApiProperty({ example: 'gustavofranco@solidktech.com' })
  email: string;

  @ApiProperty({ example: 'YOUR PASSWORD HERE' })
  password: string;

  createdAt: Date;
}
