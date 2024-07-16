import { Module } from '@nestjs/common';
import { SaveService } from './save.service';
import { SaveController } from './save.controller';
import { User } from '../users/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Save } from './entities/save.entity';
import { Post } from '../posts/entities/post.entity';

@Module({
  imports:[TypeOrmModule.forFeature([User,Save,Post])],
  controllers: [SaveController],
  providers: [SaveService],
})
export class SaveModule {}
