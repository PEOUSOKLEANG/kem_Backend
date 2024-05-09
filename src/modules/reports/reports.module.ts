import { Module } from '@nestjs/common';
import { ReportsService } from './services/reports.service';
import { ReportsController } from './controllers/reports.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Report } from './entities/report.entity';
import { Post } from '../posts/entities/post.entity';
import { User } from '../users/entities/user.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Report,Post,User])],
  controllers: [ReportsController],
  providers: [ReportsService],
  exports:[ReportsService]
})
export class ReportsModule {}
