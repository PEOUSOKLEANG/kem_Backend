import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateAdminDto } from '../dto/create-admin.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../users/entities/user.entity';
import { Repository } from 'typeorm';
import { GivenAccountDto } from '../dto/given-account.dto';
import { AdminUpdateAccountDto } from '../dto/update-admin.dto';
import { Post } from 'src/modules/posts/entities/post.entity';
import { AuthService } from 'src/modules/auth/services/auth.service';

@Injectable()
export class AdminService {
 constructor(
  @InjectRepository(User) private userRepository:Repository<User>, 
  @InjectRepository(Post) private postRepository:Repository<Post>,
  private readonly authService: AuthService

){}
  // given account by username and password
  async givenAccount (givenAccountDto:GivenAccountDto){
    const exitedUsername = await this.userRepository.findOne({where:{username:givenAccountDto.username}});
    
   
      if(exitedUsername) throw new BadRequestException('Username already exited');
      console.log(givenAccountDto);
      
      const user = new User();
      
       user.username = givenAccountDto.username
      //  user  = givenAccountDto.role
       user.password = givenAccountDto.password
       user.create_at = new Date();
       user.phone_number= givenAccountDto.phone_number
      console.log(user);


       await this.userRepository.save(user)
       await this.authService.saveRefreshToken(user.id,user.username)
       return{
        message:'successful',
        statusCode:HttpStatus.OK
       }
      
    
  }

  //delete user 

  async deleteUserAccount(id:number){
    // const user = await this.userRepository.findOne({where:{id:id}});
    return await this.userRepository.delete(id);
  }
  // edit user information 

  async updateUserAcount(updateUserAcountDto:AdminUpdateAccountDto){

    const existsUsername = await this.userRepository.findOne({where:{username:updateUserAcountDto.username}});
    if (existsUsername) throw new BadRequestException('username already exited');

    const email = await  this.userRepository.findOne({where:{email:updateUserAcountDto.email}});
    if(email) throw new BadRequestException('email already exists');

    const phone_number = await this.userRepository.findOne({where:{phone_number:updateUserAcountDto.phone_number}});
    if(phone_number) throw new BadRequestException('phone number already exited');


    const user = await this.userRepository.findOne({
      where:{id:updateUserAcountDto.user_id}
    })


    user.username = updateUserAcountDto.username
    user.firstname = updateUserAcountDto.firstname
    user.lastname = updateUserAcountDto.lastname
    user.email =updateUserAcountDto.email
    user.phone_number = updateUserAcountDto.phone_number

    // await this.userRepository.update(user.id,user)
    await this.userRepository.save(user);
    return{
      message:'sucessful',
      statusCode:HttpStatus.OK
    }
  }

  //get post
  async getPost(){
    return await this.postRepository.find();
  }
  //delete post when report 
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
    
  }


  //pagination all user

}
