import { Module } from '@nestjs/common';
import { FeedbacksService } from './services/feedbacks.service';
import { FeedbacksController } from './controllers/feedbacks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Feedback } from './entities/feedback.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Feedback])],
  controllers: [FeedbacksController],
  providers: [FeedbacksService],
})
export class FeedbacksModule {}
