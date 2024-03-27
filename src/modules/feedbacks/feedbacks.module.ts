import { Module } from '@nestjs/common';
import { FeedbacksService } from './services/feedbacks.service';
import { FeedbacksController } from './controllers/feedbacks.controller';

@Module({
  controllers: [FeedbacksController],
  providers: [FeedbacksService],
})
export class FeedbacksModule {}
