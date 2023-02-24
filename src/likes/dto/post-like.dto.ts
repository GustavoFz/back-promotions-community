import { IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class LikePostDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  userId: number;

  @ApiProperty({ example: 2 })
  @IsInt()
  postId: number;
}
