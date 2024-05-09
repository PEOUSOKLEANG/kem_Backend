import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SharesService } from '../services/shares.service';
import { CreateShareDto } from '../dto/create-share.dto';
import { UpdateShareDto } from '../dto/update-share.dto';

@Controller('shares')
export class SharesController {
  constructor(private readonly sharesService: SharesService) {}

  @Post('/post')
  async sharePost(@Body() sharePost:CreateShareDto){
    return await this.sharesService.sharePost(sharePost);

  }

  @Patch('/edit/:shareId')
  async editPost(
    @Param('shareId') shareId: number,
    @Body() updateShareDto: UpdateShareDto ){
      console.log(shareId , updateShareDto);
      
    return await this.sharesService.editSharePost(shareId, updateShareDto) 

  } 

  @Delete('delete/:shareId/:user_id')
  async deleteShare(
    @Param('shareId') shareId:number,
    @Param('user_id') user_id: number ){
      console.log(shareId , user_id);
      
    return await this.sharesService.deleteShare(shareId,user_id)
  }

}
