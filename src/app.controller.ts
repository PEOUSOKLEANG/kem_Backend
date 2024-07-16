import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { UsersService } from './modules/users/services/users.service';
import { CreateUserDto } from './modules/users/dto/create-user.dto';
import { UpdateUserInfo } from './modules/users/dto/update-user.dto';
import { PostsService } from './modules/posts/services/posts.service';
import { CreatePostDto } from './modules/posts/dto/create-post.dto';
import { retry } from 'rxjs';
import { UpdatePostDto } from './modules/posts/dto/update-post.dto';
import { ReportsService } from './modules/reports/services/reports.service';
import { CreateReportDto } from './modules/reports/dto/create-report.dto';
import { SharesService } from './modules/shares/services/shares.service';
import { CreateShareDto } from './modules/shares/dto/create-share.dto';
import { FeedbacksService } from './modules/feedbacks/services/feedbacks.service';
import { CreateFeedbackDto } from './modules/feedbacks/dto/create-feedback.dto';
import { UpdateFeedbackDto } from './modules/feedbacks/dto/update-feedback.dto';
import { DeleteFeedbackDto } from './modules/feedbacks/dto/delete-validate-feedback.dto';
import { AuthService } from './modules/auth/services/auth.service';
import { SignInDto } from './modules/auth/dto/signin.dto';
import { AccessTokenGuard } from './common/guards/accessToken.guard';

@Controller('app')
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly usersService: UsersService,
    private readonly postsService: PostsService,
    private readonly reportsService: ReportsService,
    private readonly sharesService: SharesService,
    private readonly feedbacksService: FeedbacksService,
    private readonly authsService: AuthService

  ) {}
 

  @Post('register')
  async register(@Body() registerDto:CreateUserDto){
    return await this.authsService.register(registerDto);
  }

  // login 
  // @UseGuards(AccessTokenGuard)
  @Post('signin')
  async signIn (@Body() signInDto:SignInDto ){
    console.log(signInDto);
    return await this.authsService.signIn(signInDto);
  }
  //logout 
  // @UseGuards(AccessTokenGuard)
  // @Post('logout')
  // async logout( @Req() req,refreshToken:null ){
  //   return await this.authsService.logout(req.user_id, refreshToken)
  // }




  //update imformation :working
  @Patch('/user/update/:id')
  async updateUserInfo(@Param('id') id:number , @Body() updateUserInfo:UpdateUserInfo){
    // console.log(updateUserInfo,id);
    return await this.usersService.updateInformation(id,updateUserInfo);
  }

  // forget password 

  //////post

  //create post 
  // @Post('post/create')
  // async createPost(@Body() createPostDto:CreatePostDto){
  //   console.log(createPostDto);
    
  //   return await this.postsService.createPost(createPostDto)
  // }

  // //update post 

  // @Patch('post/edit')
  // async editPost(@Body() editPost:UpdatePostDto ){
  //   console.log(editPost.postId);
    
  //   return await this.postsService.updatePost(editPost);
  // }

  //remove post 
  @Delete('post/delete/:post_id')
  async removePost(@Param('post_id') post_id:number,@Param('user_id') user:any){
    return await this.postsService.deletePost(post_id,user)
  }


  //paginate post per page 

  /////Report
   // report post 
  // @Post('report/post')
  // async createReport(@Body() createReport:CreateReportDto){
  //  return await this.reportsService.CreateReport(createReport);
  // }


  // report post 

  
  // alert count reach max
  
  
  //share post
  @Post('share/post')
  async sharePost(sharePost:CreateShareDto){
    return await this.sharesService.sharePost(sharePost);
  }

  //create feedback 

  @Post('post/feedback/create')
  async createfeedback(@Body() createFeedback:CreateFeedbackDto){
    return await this.feedbacksService.createFeedback(createFeedback);

  }
  //update feedback
  @Patch('post/feedback/edit/:id')
  async editFeedback(@Param('id' ) id:number ,@Body() updateFeedback:UpdateFeedbackDto){
    return await this.feedbacksService.updateFeedback(id,updateFeedback)
  }


  //delete feedback 

  @Delete('feeback/delete/:removeFeedback.feedback_id')
  async removeFeedback(@Param('removeFeedback') removeFeedback:DeleteFeedbackDto, ){
    return await this.feedbacksService.deleteFeedback(removeFeedback)

  }

  
}
