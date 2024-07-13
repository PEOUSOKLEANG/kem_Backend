import { Module } from '@nestjs/common';
import { AdminService } from './services/admin.service';
import { AdminController } from './controllers/admin.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Post } from '../posts/entities/post.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports:[TypeOrmModule.forFeature([User,Post]),AuthModule],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
