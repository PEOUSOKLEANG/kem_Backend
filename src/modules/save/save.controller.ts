import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SaveService } from './save.service';
import { CreateSaveDto } from './dto/create-save.dto';
import { UpdateSaveDto } from './dto/update-save.dto';

@Controller('save')
export class SaveController {
  constructor(private readonly saveService: SaveService) {}

}
