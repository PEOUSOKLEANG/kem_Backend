import { PartialType } from '@nestjs/mapped-types';
import { CreateProfileimageDto } from './create-profileimage.dto';

export class UpdateProfileimageDto extends PartialType(CreateProfileimageDto) {}
