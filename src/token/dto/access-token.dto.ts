import { IsJWT } from 'class-validator';

export class AccessToken {
  @IsJWT()
  access_token: string;
}
