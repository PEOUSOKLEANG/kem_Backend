import { Injectable } from '@nestjs/common';
import { CreateChatimageDto } from '../dto/create-chatimage.dto';
import { UpdateChatimageDto } from '../dto/update-chatimage.dto';


@Injectable()
export class ChatimageService {
  create(createChatimageDto: CreateChatimageDto) {
    return 'This action adds a new chatimage';
  }

  findAll() {
    return `This action returns all chatimage`;
  }

  findOne(id: number) {
    return `This action returns a #${id} chatimage`;
  }

  update(id: number, updateChatimageDto: UpdateChatimageDto) {
    return `This action updates a #${id} chatimage`;
  }

  remove(id: number) {
    return `This action removes a #${id} chatimage`;
  }
}
