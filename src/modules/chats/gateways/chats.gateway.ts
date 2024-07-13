import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer } from '@nestjs/websockets';
import { ChatsService } from '../services/chats.service';
import { CreateChatDto } from '../dto/create-chat.dto';
import { UpdateChatDto } from '../dto/update-chat.dto';
import { Socket, Server } from 'socket.io';
import { UseGuards } from '@nestjs/common';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';


@WebSocketGateway()
export class ChatsGateway {
  @WebSocketServer() server: Server;
  
  constructor(private readonly chatsService: ChatsService) {}


  onModuleInit(){
    this.server.on('connection',(socket)=>{
      console.log(socket.id);
      console.log('Connected');
      
      
    })
  }

  @UseGuards(AccessTokenGuard)
  @SubscribeMessage('Message')
  onNewMessage(@MessageBody() body:any) {
    console.log(body);
    
    // return this.chatsService.create(createChatDto);
    
  }

  // @SubscribeMessage('findAllChats')
  // findAll() {
  //   return this.chatsService.findAll();
  // }

  // @SubscribeMessage('findOneChat')
  // findOne(@MessageBody() id: number) {
  //   return this.chatsService.findOne(id);
  // }

  // @SubscribeMessage('updateChat')
  // update(@MessageBody() updateChatDto: UpdateChatDto) {
  //   return this.chatsService.update(updateChatDto.id, updateChatDto);
  // }

  // @SubscribeMessage('removeChat')
  // remove(@MessageBody() id: number) {
  //   return this.chatsService.remove(id);
  // }
  // @SubscribeMessage('d')
  // async chat( client: Socket, data: { payload:any }){

  // }
}
