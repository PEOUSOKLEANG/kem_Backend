import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/modules/users/entities/user.entity';
import { Repository } from 'typeorm';
import { privateDecrypt } from 'crypto';
import { Chat } from '../entities/chat.entity';

@Injectable()
export class ChatsService {

  constructor(
    @InjectRepository(Chat) private  chatRepository:Repository<Chat>,
    @InjectRepository(User) private userRepository:Repository<User>,
  ){
  
  // save message
  // who send message is sender 
  //if (message === null) 
  // const chat = new Chat();
  // if (message !== null)
  // Compare first if true 
  //const chat = await this.chatRepository.findOne({where:{key:key}}) 
  


  //message history

  } 
 
}
