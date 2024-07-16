import { BadRequestException, HttpStatus, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreatePostDto } from '../dto/create-post.dto';
import { UpdatePostDto } from '../dto/update-post.dto';
import { Post } from '../entities/post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/modules/users/entities/user.entity';
import { GeneralRespone } from 'src/modules/types/generalRespone';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post) private postRepository:Repository<Post>,
    @InjectRepository(User) private userRepository:Repository<User>
  ){}

  async createPost(createPostDto:CreatePostDto , sub:number):Promise<GeneralRespone>{
    const post = new Post();

    post.user = await this.userRepository.findOne({where:{id:sub}})
    post.location = createPostDto.location
    post.post_date = new Date()
    post.contact = createPostDto.contact
    post.categories = createPostDto.categories
    post.fb_link = createPostDto.fb_link
    post.tele_link = createPostDto.tele_link
    post.fb_link_active =createPostDto.fb_link_active
    post.tele_link_active= createPostDto.tele_link_active
    post.post_file = createPostDto.post_file
    post.description = createPostDto.description
    console.log(post);
    
    await this.postRepository.save(post);
    return {
      data:post,
      message:'Successful',
      statusCode:HttpStatus.OK,
      
    }


    
  }
  //delete post
  // async deletePost(id:number) {
  //   const isPost = await this.userRepository.findOne({
  //     where:{id:id}
  //     ,relations:{post:true}
  //     ,select:{post:{id:true}}
  //   })
  //   if(isPost){

  //     await this.postRepository.delete(id);
  //     return {
  //       message:'post is deleted.',
  //       statusCode:HttpStatus.OK
  //     }
  //   }
  // }
  async deletePost(post_id:number, sub:number) {
    console.log('logS2',sub);
    
    const isUser = await this.userRepository.findOne({
      where:{id:sub}
    });

    if (!isUser) throw new NotFoundException('User not found')
    const isPost = await this.postRepository.findOne({
      where:{id:post_id},
      relations:{user:true,feedback:true,report:true}
    });

    if(!isPost) throw new NotFoundException('Post not found');
    console.log(isPost ,isUser);
    if(isPost.user.id !== isUser.id) throw new UnauthorizedException('User is not the owner of this post');


    await this.postRepository.delete(post_id);
    return{
        message:'post is deleted.',
        statusCode:HttpStatus.OK
    }
    // if(isPost){
    //   await this.postRepository.delete(post_id);
    //   return {
    //     message:'post is deleted.',
    //     statusCode:HttpStatus.OK
    //   }
    // }
  }

//update Post
  async updatePost (updatePostDto: UpdatePostDto,sub:number){
    // console.log(updatePostDto.user);
    // Retrieve the user
    var user = await this.userRepository.findOne({
      where:{id:sub}
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    // Retrieve the post need to relation to user
    var post = await this.postRepository.findOne({
      where: {id: updatePostDto.postId},
      relations:{user:true}
    });
    console.log("post" , post);
    
    if (!post) {
      throw new NotFoundException('Post not found');
    }

    // Check ownership
    if(post.user.id !== user.id) throw new UnauthorizedException('User is not the owner of this post');

    // console.log("----------> Hello ");
    
    console.log(post);
     post.description = updatePostDto.description
     post.location = updatePostDto.location
     post.contact = updatePostDto.contact
     post.categories= updatePostDto.categories
     post.categories = updatePostDto.categories
     post.fb_link = updatePostDto.fb_link
     post.tele_link = updatePostDto.tele_link
     post.fb_link_active =updatePostDto.fb_link_active
     post.tele_link_active= updatePostDto.tele_link_active
    //  post.post_file = updatePostDto.post_file
     await this.postRepository.save(post);

    return{
      message:'post is updated',
      statusCode:HttpStatus.OK,
      post:post 
    }
  }

  
  
 

//  random post 


// get all post for guest 
async getPost(){
  return  await this.postRepository.find();
}

   

}
