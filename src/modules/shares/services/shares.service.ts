import { HttpStatus, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateShareDto } from '../dto/create-share.dto';
import { UpdateShareDto } from '../dto/update-share.dto';
import { Share } from '../entities/share.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/modules/users/entities/user.entity';
import { Post } from 'src/modules/posts/entities/post.entity';
import { share } from 'rxjs';

@Injectable()
export class SharesService {
  constructor(
    @InjectRepository(Share) private shareRepository:Repository<Share>,
    @InjectRepository(Post) private postRepository:Repository<Post>,
    @InjectRepository(User) private userRepository:Repository<User>
  ){}

  //share post
  async sharePost(sharePostDto:CreateShareDto){
    const share = new Share();

    share.user = await this.userRepository.findOne({where:{id:sharePostDto.user_share_id}})
    share.post = await this.postRepository.findOne({where:{id:sharePostDto.post_id}})
    share.caption = sharePostDto.caption
    share.date_shared= new Date()


    if(!share.user) throw new NotFoundException('User not found');
    if(!share.post) throw new NotFoundException('Post not found')

    await this.shareRepository.save(share);

    return share;
    // return await this.shareRepository.findOne({where:{id:share.}})

    // if(share.post ===null){
    //   return{
    //     message:'somthing went worng.',
    //     statusCode:HttpStatus.INTERNAL_SERVER_ERROR
    //   }
    // }
  }


  //edit share Post 
  async editSharePost(shareId:number,editShareDto:UpdateShareDto){

    console.log(shareId ,editShareDto );
    
    const shareUser = await this.userRepository.findOne({where:{id:editShareDto.user_share_id}});
    const editShare = await this.shareRepository.findOne({where:{id:shareId},relations:{user:true}});

    if(!shareUser) throw new NotFoundException('User not found');
    if(!editShare) throw new NotFoundException('Share post not found')

      if(editShare.user.id !== shareUser.id) throw new UnauthorizedException('User is not the owner of this share')
  
    editShare.caption = editShareDto.caption
    editShare.date_shared = new Date()

    await this.shareRepository.save(editShare);
    return{
      message:'successful',
      statusCode:HttpStatus.OK
    }
  }

  // // delete post
  // async deleteShare(id:number){
  //   const deleteShare = await this.userRepository.delete(id)
  //   return{
  //     message:'successful',
  //     statusCode:HttpStatus.OK,
  //     deleteShare
  //   }
  // }

  async deleteShare( share_id:number , user_id: number){
    console.log(share_id , user_id);
    
    const shareUser = await this.userRepository.findOne({where:{id:user_id}});

    if(!shareUser) throw new NotFoundException('User not found');

    const sharePost = await this.shareRepository.findOne({where:{id:share_id},relations:{user:true}});

    if(!sharePost) throw new NotFoundException('Share not share');

    if(sharePost.user.id !== shareUser.id) throw new UnauthorizedException('User is not owership this share');


    await this.shareRepository.delete(share_id);

    return{
      statusCode:HttpStatus.OK,
      message:'Share is delete'
    };




 
  }
}
