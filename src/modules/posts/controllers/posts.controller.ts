import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { PostsService } from '../services/posts.service';
import { CreatePostDto } from '../dto/create-post.dto';
import { UpdatePostDto } from '../dto/update-post.dto';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { SystemRolesGuard } from 'src/common/guards/system_roles.guard';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @UseGuards(AccessTokenGuard, SystemRolesGuard)
  @Post('/create')
  async createPost(@Body() createPostDto:CreatePostDto, @Req() req:any){
    console.log(createPostDto);
    return await this.postsService.createPost(createPostDto,req.user.sub)
  }

  
  // //update post 
  @UseGuards(AccessTokenGuard, SystemRolesGuard)
  @Patch('post/edit')
  async editPost(@Body() editPost:UpdatePostDto, @Req() req:any){
    // console.log(editPost.postId);
    
    return await this.postsService.updatePost(editPost ,req.user.sub );
  }


  @UseGuards(AccessTokenGuard, SystemRolesGuard)
  @Delete('delete/:post_id')
  async deletePost(
    @Req() req:any,
    // @Param('user_id') user_id: number,
    @Param('post_id') post_id: number
    
  ){
    const userid = req.user.sub
    console.log(req.user.sub);
    
    return await this.postsService.deletePost(post_id ,userid)
    // return await this.postsService.deletePost(post_id ,userid) ** be care with is prop 
    //exmaple if two value of is not objet it can be confuse
  }
  // get all post  
}
