import { BadRequestException, HttpStatus, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateFeedbackDto } from '../dto/create-feedback.dto';
import { UpdateFeedbackDto } from '../dto/update-feedback.dto';
import { Feedback } from '../entities/feedback.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/modules/users/entities/user.entity';
import { Post } from 'src/modules/posts/entities/post.entity';
import { PostsService } from 'src/modules/posts/services/posts.service';
import { DeleteFeedbackDto } from '../dto/delete-validate-feedback.dto';



@Injectable()
export class FeedbacksService {
  constructor(@InjectRepository(Feedback) private feedbackRepository:Repository<Feedback>,
  @InjectRepository(User) private userRepository:Repository<User>,
  @InjectRepository(Post) private postRepository:Repository<Post>,
  private postService:PostsService
){}
  
 
  

  // create feedback need to have post and user given feeback 
  async createFeedback(createFeedbackDto:CreateFeedbackDto){
    const feedback = new Feedback();
    console.log(createFeedbackDto);
    
    feedback.user = await this.userRepository.findOne({where:{id:createFeedbackDto.given_feedback}})
    feedback.post = await this.postRepository.findOne({where:{id:createFeedbackDto.post_id}})
    feedback.feedback = createFeedbackDto.feedback
    feedback.image = createFeedbackDto.image

    if(!feedback.user) throw new NotFoundException('User not found ');
    if(!feedback.post) throw new NotFoundException('Post not found');
    await this.feedbackRepository.save(feedback)
    return {
      message:'feedback is done.',
      statusCode:HttpStatus.OK
    }
  }
  //updtad feedback need to validate feedback and user is True

  // async isUser(id:number):Promise<Boolean>{
  //   await this.userRepository.findOne({where:{id:id}})
  //   return true;
  // }
  
  async updateFeedback(feedback_id:number,updateFeedbackDto:UpdateFeedbackDto){

    const isPost = await this.postRepository.findOne({where:{id:updateFeedbackDto.post_id}})
    if(!isPost) throw new NotFoundException('Post not found'); 

    const isUser = await this.userRepository.findOne({where:{id:updateFeedbackDto.given_feedback}});
    if (!isUser) throw new NotFoundException('User not found');

    const updateFeedback = await this.feedbackRepository.findOne({where:{
      id:feedback_id
    }})
    if(!updateFeedback) throw new NotFoundException('Feedback not found');
    // validate post and feedback  (post > feedback > user)
    if(updateFeedback.post.id !== isPost.id) throw new BadRequestException('post is not matched');
    //need to validate feedback between user 
    if(updateFeedback.user.id !== isUser.id) throw new UnauthorizedException('User is not ownership feedback');
    
    updateFeedback.feedback = updateFeedbackDto.feedback
    updateFeedback.image = updateFeedbackDto.image
    await this.feedbackRepository.save(updateFeedback);
    return {
      date:[
        {
          message:'Feedback is updated',
          statusCode:HttpStatus.OK
        }
      ]
     }
    
    // else if (!isPost) return {
    //   message:'Something went worng with the post',
    // statusCode:HttpStatus.INTERNAL_SERVER_ERROR 
    // };
    // // not the user create feedback
    // else if(!isUser) return {
    //   message:'You are not able to update this feedback.',
    //   statusCode:HttpStatus.BAD_REQUEST
    // }
    
    



  } 
  //delete the same as update
  async deleteFeedback(deleteFeedbackDto:DeleteFeedbackDto){
    const isUser = await this.userRepository.findOne({where:{id:deleteFeedbackDto.user_id}});
    if (!isUser) throw new NotFoundException('User not found');

    const isPost = await this.postRepository.findOne({where:{id:deleteFeedbackDto.post_id}});
    if(!isPost) throw new NotFoundException('Post not found'); 

    const deleteFeedback = await this.feedbackRepository.findOne({
      where:{id:deleteFeedbackDto.feedback_id}
    })
    if(!deleteFeedback) throw new NotFoundException('Feedback not found');

    if(deleteFeedback.post.id !== isPost.id) throw new BadRequestException('post is not matched');
    if(deleteFeedback.user.id !== isUser.id) throw new UnauthorizedException('User is not ownership feedback');

      await this.feedbackRepository.delete(deleteFeedbackDto.feedback_id);
      return{
        message:'This feedback is deleted',
        statusCode:HttpStatus.OK
      }
    
    // else if(!isUser) return {message:'You are not able to deleted this post'}

    
  }
  //get feedback relate on the post


  
}
