import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserInfo } from '../dto/update-user.dto';
import { ChangePassword } from '../dto/chanegpassword.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // @Post('/register')
  // async register(@Body() registerDto:CreateUserDto){
  //   return await this.usersService.registerNewUser(registerDto);
  // }

  @Patch()
  async updateUserInfo(@Body() updateUserInfo:UpdateUserInfo, id:number){
    return await this.usersService.updateInformation(id,updateUserInfo);
  }

  // change password 
  @Patch('/password/change/:userId')
  async changePassword(
    // @Body() userId: number,
    @Param('userId') userId: number,
    @Body() changepassword:ChangePassword,

  ){
    console.log( "me",userId);
    
    return await this.usersService.changePassword(userId ,changepassword) 
  }
 
}
