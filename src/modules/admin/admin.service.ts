import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Repository } from 'typeorm';
import { GivenAccountDto } from './dto/given-account.dto';
import { AdminUpdateAccountDto } from './dto/update-admin.dto';

@Injectable()
export class AdminService {
 constructor(
  @InjectRepository(User) private userRepository:Repository<User>, 
){}
  // given account by username and password
  async givenAccount (givenAccountDto:GivenAccountDto){
    const exitedUsername = await this.userRepository.findOne({where:{username:givenAccountDto.username}});
    
    try {
      if(exitedUsername) throw Error;
      const user = new User();
       user.username = givenAccountDto.username
       user.role  = givenAccountDto.role
       user.password = givenAccountDto.password
       user.create_at = new Date();

       await this.userRepository.save(user)
       return{
        message:'successful',
        statusCode:HttpStatus.OK
       }
      
    } catch (error) {
      throw new HttpException({
        message:'username already exits',
        status:HttpStatus.BAD_REQUEST     
      },HttpStatus.BAD_REQUEST)
      
    }
  }

  //delete user 

  async deleteUserAccount(id:number){
    // const user = await this.userRepository.findOne({where:{id:id}});
    return await this.userRepository.delete(id);
  }
  // edit user information 

  async updateUserAcount(updateUserAcountDto:AdminUpdateAccountDto){
    const user = await this.userRepository.findOne({
      where:{id:updateUserAcountDto.user_id}
    })

    

  }

  //



  //delete post when report 


  //pagination all user

}
