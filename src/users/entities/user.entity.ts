import { ApiProperty } from '@nestjs/swagger';
import Prisma from '@prisma/client';

export class User implements Partial<Prisma.User> {
  id: number;

  @ApiProperty({
    example: 'Gustavo Franco',
  })
  nickname: string;

  @ApiProperty({
    example: 'www.mypicture.com/picture3',
    required: false,
  })
  picture?: string;

  @ApiProperty({
    example: 'gustavofranco@solidtech.com',
  })
  email: string;

  @ApiProperty({
    example: 'YOUR PASSWORD HERE',
  })
  password: string;

  createdAt: Date;
}
