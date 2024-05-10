import { Module } from '@nestjs/common';
import { ChatsService } from './services/chats.service';
import { ChatsGateway } from './gateways/chats.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chat } from './entities/chat.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Chat])],
  providers: [ChatsGateway, ChatsService],
})
export class ChatsModule {}
