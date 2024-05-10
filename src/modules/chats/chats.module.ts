import { Module } from '@nestjs/common';
import { ChatsService } from './services/chats.service';
import { ChatsGateway } from './gateways/chats.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[TypeOrmModule.forRoot({})],
  providers: [ChatsGateway, ChatsService],
})
export class ChatsModule {}
