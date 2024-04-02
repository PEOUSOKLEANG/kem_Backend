import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserInfo } from '../dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/register')
  async register(@Body() registerDto:CreateUserDto){
    return await this.usersService.registerNewUser(registerDto);
  }

  @Patch()
  async updateUserInfo(@Body() updateUserInfo:UpdateUserInfo, id:number){
    return await this.usersService.updateInformation(id,updateUserInfo);
  }
 
}
