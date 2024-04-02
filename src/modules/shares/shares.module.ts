import { Module } from '@nestjs/common';
import { SharesService } from './services/shares.service';
import { SharesController } from './controllers/shares.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Share } from './entities/share.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Share])],
  controllers: [SharesController],
  providers: [SharesService],
})
export class SharesModule {}
