import { User } from './user.entity';

export class Profile extends User {
  followers?: number[] = [1];
  following?: number[] = [2];
  posts?: number = 50;
  hotPosts?: number = 10;
  thanks?: number = 20;
  likes?: number = 10000;
}
