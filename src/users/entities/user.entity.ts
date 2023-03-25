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

  followers?: number[] = [1];
  following?: number[] = [2];
  posts?: number = 50;
  hotPosts?: number = 10;
  thanks?: number = 20;
  likes?: number = 10000;

  updatedAt: Date;
  createdAt: Date;

  constructor(user?: Partial<User>) {
    this.id = user?.id;
    this.nickname = user?.nickname;
    this.picture = user?.picture;
    this.email = user?.email;
    this.password = user?.password;
    this.updatedAt = user?.updatedAt;
    this.createdAt = user?.createdAt;
  }
}
