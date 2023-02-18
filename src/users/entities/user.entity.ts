import Prisma from '@prisma/client';

export class User implements Partial<Prisma.User> {
  id: number;
  nickname: string;
  picture?: string;
  email: string;
  password: string;
  createdAt: Date;
}
