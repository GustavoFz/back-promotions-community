import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';

export class LikeCommentDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  userId: number;

  @ApiProperty({ example: 2 })
  @IsInt()
  commentId: number;
}
