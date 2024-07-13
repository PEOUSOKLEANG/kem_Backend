import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PostsService } from '../services/posts.service';
import { CreatePostDto } from '../dto/create-post.dto';
import { UpdatePostDto } from '../dto/update-post.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post('post/create')
  async createPost(@Body() createPostDto:CreatePostDto){
    console.log(createPostDto);
    return await this.postsService.createPost(createPostDto)
  }

  @Delete('delete/:user_id/:post_id')
  async deletePost(
    @Param('user_id') user_id: number,
    @Param('post_id') post_id: number
  ){
    return await this.postsService.deletePost(user_id,post_id)
  }
}
