import { BadRequestException, HttpStatus, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreatePostDto } from '../dto/create-post.dto';
import { UpdatePostDto } from '../dto/update-post.dto';
import { Post } from '../entities/post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/modules/users/entities/user.entity';
import { GeneralRespone } from 'src/modules/types/generalRespone';
import { PostRespone } from 'src/modules/types/postRespone';
import { throwError } from 'rxjs';
import { log } from 'console';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post) private postRepository:Repository<Post>,
    @InjectRepository(User) private userRepository:Repository<User>
  ){}

  async createPost(createPostDto:CreatePostDto):Promise<GeneralRespone>{
    const post = new Post();

    post.user = await this.userRepository.findOne({where:{id:createPostDto.user}})
    post.key_post = createPostDto.key_post
    post.location = createPostDto.location
    post.post_date = new Date()
    post.post_file = createPostDto.post_file
    post.description = createPostDto.description
    console.log(post);
    
    await this.postRepository.save(post);

    return {
      message:'Successful',
      statusCode:HttpStatus.OK
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
  async deletePost(post_id:number, user_id:number) {
    const isUser = await this.userRepository.findOne({
      where:{id:user_id}
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
  async updatePost (updatePostDto: UpdatePostDto){
    console.log(updatePostDto.user);
    // Retrieve the user
    var user = await this.userRepository.findOne({
      where:{id:updatePostDto.user}
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
     post.key_post = updatePostDto.key_post
     post.description = updatePostDto.description
     post.location = updatePostDto.location
     await this.postRepository.save(post);

    return{
      message:'post is updated',
      statusCode:HttpStatus.OK,
      post:post 
    }


    

    
    // if( post){
    //  post.key_post = updatePostDto.key_post
    //  post.description = updatePostDto.description
    //  post.location = updatePostDto.location
    //  await this.postRepository.save(post);

    //  console.log(post);
     
    // return{
    //   message:'post is updated',
    //   statusCode:HttpStatus.OK,
    //   post:post 
    // }
    // }
  }

  // async updatePost(user_id: number, post_id: number, updateData: Partial<Post>): Promise<Post> {
  //   // Retrieve the post
  //   const post = await this.postRepository.findOne(post_id, { relations: ['user'] });
  //   if (!post) {
  //     throw new NotFoundException('Post not found');
  //   }

  //   // Retrieve the user
  //   const user = await this.userRepository.findOne(user_id);
  //   if (!user) {
  //     throw new NotFoundException('User not found');
  //   }

  //   // Check ownership
  //   if (post.user.id !== user.id) {
  //     throw new UnauthorizedException('User is not the owner of this post');
  //   }

  //   // Update the post
  //   Object.assign(post, updateData);
  //   const updatedPost = await this.postRepository.save(post);
  //   return updatedPost;
  // }

  // validate Post
 

//  random post 


   

}
