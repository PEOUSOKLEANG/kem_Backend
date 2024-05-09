import { Module } from '@nestjs/common';
import { FeedbacksService } from './services/feedbacks.service';
import { FeedbacksController } from './controllers/feedbacks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Feedback } from './entities/feedback.entity';
import { User } from '../users/entities/user.entity';
import { PostsService } from '../posts/services/posts.service';
import { Post } from '../posts/entities/post.entity';
import { PostsModule } from '../posts/posts.module';

@Module({
  imports:[
    PostsModule,
    TypeOrmModule.forFeature([Feedback,User,Post])],
  controllers: [FeedbacksController],
  providers: [FeedbacksService],
  exports:[FeedbacksService]
})
export class FeedbacksModule {}
