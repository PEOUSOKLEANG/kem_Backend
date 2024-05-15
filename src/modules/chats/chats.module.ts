import { Module } from '@nestjs/common';
import { ChatsService } from './services/chats.service';
import { ChatsGateway } from './gateways/chats.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chat } from './entities/chat.entity';
import { User } from '../users/entities/user.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Chat,User])],
  providers: [ChatsGateway, ChatsService],
})
export class ChatsModule {}
