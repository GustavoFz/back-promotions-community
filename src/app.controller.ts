import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';

import {
  Comment as CommentModel,
  Post as PostModel,
  User as UserModel,
} from '@prisma/client';
import { CommentService } from './Comment/comment.service';
import { PostService } from './Post/post.service';
import { UserService } from './User/user.service';

@Controller()
export class AppController {
  constructor(
    private readonly userService: UserService,
    private readonly postService: PostService,
    private readonly commentService: CommentService,
  ) {}

  @Get('post/:id')
  async getPostById(@Param('id') id: string): Promise<PostModel> {
    return this.postService.post({ id: Number(id) });
  }

  @Get('post')
  async getPublishedPosts(): Promise<PostModel[]> {
    return this.postService.posts({});
  }

  @Get('filtered-posts/:searchString')
  async getFilteredPosts(
    @Param('searchString') searchString: string,
  ): Promise<PostModel[]> {
    return this.postService.posts({
      where: {
        OR: [
          {
            title: { contains: searchString },
          },
          {
            content: { contains: searchString },
          },
        ],
      },
    });
  }

  @Post('post')
  async createPost(@Body() postData: PostModel): Promise<PostModel> {
    const { title, content, userId, image, price, link, company } = postData;
    return this.postService.createPost({
      title,
      content,
      user: {
        connect: {
          id: userId,
        },
      },
      image,
      price,
      link,
      company,
    });
  }

  @Post('user')
  async signupUser(@Body() userData: UserModel): Promise<UserModel> {
    return this.userService.createUser(userData);
  }

  @Delete('post/:id')
  async deletePost(@Param('id') id: string): Promise<PostModel> {
    return this.postService.deletePost({ id: Number(id) });
  }

  @Get('comments/:id')
  async getFilteredComments(@Param('id') id: string): Promise<CommentModel[]> {
    return this.commentService.comments({
      where: {
        postId: Number(id),
      },
      include: {
        user: {
          select: {
            id: true,
            nickname: true,
            picture: true,
          },
        },
      },
    });
  }

  @Get('comment/:id')
  async getCommentById(@Param('id') id: string): Promise<CommentModel> {
    return this.commentService.comment({ id: Number(id) });
  }

  @Get('comment')
  async getComments(): Promise<CommentModel[]> {
    return this.commentService.comments({});
  }

  @Post('comment')
  async createComment(
    @Body() commentData: CommentModel,
  ): Promise<CommentModel> {
    return this.commentService.createComment(commentData);
  }

  @Delete('comment/:id')
  async deleteComment(@Param('id') id: string): Promise<CommentModel> {
    return this.commentService.deleteComment({ id: Number(id) });
  }
}
