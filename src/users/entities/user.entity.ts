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

  isFollower?: boolean;

  followed?: Array<any>;

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
