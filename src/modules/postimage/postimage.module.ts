import { Module } from '@nestjs/common';
import { PostimageController } from './controller/postimage.controller';
import { PostimageService } from './services/postimage.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';


@Module({
  imports: [TypeOrmModule.forFeature([]),
  MulterModule.register({
     // Configure Multer module with storage settings for file uploads
    storage: diskStorage({
      // Specify the destination directory for uploaded files
      destination: './uploads',
      // Define a function to generate unique filenames
      filename: (req, file, cb) => {
        const randomName = Array(32)
          .fill(null)
          .map(() => Math.round(Math.random() * 16).toString(16))
          .join('');
        cb(null, `${randomName}${extname(file.originalname)}`);
      },
    }),
  }),
],
  controllers: [PostimageController],
  providers: [PostimageService],
})
export class PostimageModule {}
