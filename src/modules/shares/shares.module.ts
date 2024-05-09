import { Module } from '@nestjs/common';
import { SharesService } from './services/shares.service';
import { SharesController } from './controllers/shares.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Share } from './entities/share.entity';
import { User } from '../users/entities/user.entity';
import { Post } from '../posts/entities/post.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Share,User,Post])],
  controllers: [SharesController],
  providers: [SharesService],
  exports:[SharesService]
})
export class SharesModule {}
