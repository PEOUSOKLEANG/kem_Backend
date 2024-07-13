import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AdminService } from '../services/admin.service';
import { GivenAccountDto } from '../dto/given-account.dto';
import { AdminUpdateAccountDto } from '../dto/update-admin.dto';


@Controller('admin')
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
    

  ) {}

 

  @Post('given/account')
  async givenAccount (@Body() givenAccountDto:GivenAccountDto ){
    return await this.adminService.givenAccount(givenAccountDto);
  }

  @Delete('delete/account')
  async deleteUserAccount(@Body() id:number){
    return await this.adminService.deleteUserAccount(id)
  }

  // update User account 
  @Patch()
  async updateUserAccount(@Body() updateUserAcountDto:AdminUpdateAccountDto){
    return await this.adminService.updateUserAcount(updateUserAcountDto);
  }
  //get Post 
  @Post('get/post')
  async getPost(){
    return await this.adminService.getPost();
  }

  //delete post when after goot report 
  @Delete('delete/:user_id/:post_id')
  async deletePost(@Param('post_id') post_id:number , @Param('user_id') user_id:number ){
    return await this.adminService.deletePost(post_id,user_id);
  }

  //Get report


  // delete post 
}
