import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FeedbacksService } from '../services/feedbacks.service';
import { CreateFeedbackDto } from '../dto/create-feedback.dto';
import { UpdateFeedbackDto } from '../dto/update-feedback.dto';

@Controller('feedbacks')
export class FeedbacksController {
  constructor(private readonly feedbacksService: FeedbacksService) {}

  @Post('create')
  async createFeedback(@Body() createFeedbackDto:CreateFeedbackDto){
    return await this.feedbacksService.createFeedback(createFeedbackDto);

  }

  //user_id , post_id , feedback_id the same as delete 
  @Patch('update/:feeback_id')
  async updateFeedback(
    @Param('feedback_id') feedback_id:number,
    @Body() updateFeedbackDto:UpdateFeedbackDto
){
    return await this.feedbacksService.updateFeedback(feedback_id , updateFeedbackDto) 
   }
} 
