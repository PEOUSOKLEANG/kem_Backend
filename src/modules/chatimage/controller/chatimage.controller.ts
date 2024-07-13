import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreateChatimageDto } from '../dto/create-chatimage.dto';
import { UpdateChatimageDto } from '../dto/update-chatimage.dto';
import { ChatimageService } from '../service/chatimage.service';

@Controller('chatimage')
export class ChatimageController {
  constructor(private readonly chatimageService: ChatimageService) {}

  @Post()
  create(@Body() createChatimageDto: CreateChatimageDto) {
    return this.chatimageService.create(createChatimageDto);
  }

  @Get()
  findAll() {
    return this.chatimageService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.chatimageService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateChatimageDto: UpdateChatimageDto) {
    return this.chatimageService.update(+id, updateChatimageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.chatimageService.remove(+id);
  }
}
