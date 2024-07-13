import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProfileimageService } from '../services/profileimage.service';


@Controller('profileimage')
export class ProfileimageController {
  constructor(private readonly profileimageService: ProfileimageService) {}

  // // Define a POST route for uploading images
  // @Post('upload')
  // // Use FileInterceptor to handle file uploads, expecting a field named 'file'
  // @UseInterceptors(FileInterceptor('file'))
  // // Method to handle the uploaded file
  // async uploadFile(@UploadedFile() file: Express.Multer.File) {
  //   // Delegate the business logic to the ImageService
  //   return this.imageService.uploadImage(file);

  
}
