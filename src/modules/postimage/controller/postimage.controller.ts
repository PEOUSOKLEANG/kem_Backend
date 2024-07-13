import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';

import { CreatePostimageDto } from '../dto/create-postimage.dto';
import { UpdatePostimageDto } from '../dto/update-postimage.dto';
import { PostimageService } from '../services/postimage.service';

@Controller('postimage')
export class PostimageController {
  constructor(private readonly postimageService: PostimageService) {}

  @Post()
  create(@Body() createPostimageDto: CreatePostimageDto) {
    return this.postimageService.create(createPostimageDto);
  }

  @Get()
  findAll() {
    return this.postimageService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postimageService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostimageDto: UpdatePostimageDto) {
    return this.postimageService.update(+id, updatePostimageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postimageService.remove(+id);
  }
}
