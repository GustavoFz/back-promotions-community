import Prisma from '@prisma/client';

export class TokenDto implements Prisma.Token {
  id: number;

  hash: string;

  email: string;
}
