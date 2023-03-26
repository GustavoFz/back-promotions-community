import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class FollowDto {
  @ApiProperty({ example: '2' })
  @IsNotEmpty()
  followingId: number;
}
