export class TokenDto {
  id: number;

  hash: string;

  email: string;

  createdAt: Date;

  constructor(token?: Partial<TokenDto>) {
    this.id = token?.id;
    this.hash = token?.hash;
    this.email = token?.email;
    this.createdAt = token?.createdAt;
  }
}
