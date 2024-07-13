import { PartialType } from '@nestjs/mapped-types';
import { CreateChatimageDto } from './create-chatimage.dto';

export class UpdateChatimageDto extends PartialType(CreateChatimageDto) {}
