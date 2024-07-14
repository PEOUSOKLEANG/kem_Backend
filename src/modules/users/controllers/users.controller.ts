import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserInfo } from '../dto/update-user.dto';
import { ChangePassword } from '../dto/chanegpassword.dto';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { Roles } from 'src/common/decorators/role.decorator';
import { Role } from 'src/common/enum/role.enum';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // @Post('/register')
  // async register(@Body() registerDto:CreateUserDto){
  //   return await this.usersService.registerNewUser(registerDto);
  // }
  @UseGuards(AccessTokenGuard)
  @Get('/profile')
  @Roles(Role.Admin)
  
  async getProfile(  @Req() req  ){
  console.log(Role.Admin);

    return await this.usersService.findUser(req.user.sub)
  }
  

  @Patch('/update/:id')
  async updateUserInfo(@Param('id') id:number , @Body() updateUserInfo:UpdateUserInfo){
    // console.log(updateUserInfo,id);
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
