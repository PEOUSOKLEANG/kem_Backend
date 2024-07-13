import { PartialType } from '@nestjs/mapped-types';
import { CreatePostimageDto } from './create-postimage.dto';

export class UpdatePostimageDto extends PartialType(CreatePostimageDto) {}
