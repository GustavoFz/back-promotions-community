import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsInt } from 'class-validator';
export class LikePostDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  userId: number;

  @ApiProperty({ example: 2 })
  @IsInt()
  postId: number;

  @ApiProperty({
    description: 'true for like and false for unlike',
    example: true,
  })
  @IsBoolean()
  type: boolean;
}
