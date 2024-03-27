import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PostsModule } from './modules/posts/posts.module';
import { FeedbacksModule } from './modules/feedbacks/feedbacks.module';
import { ReportsModule } from './modules/reports/reports.module';
import { SharesModule } from './modules/shares/shares.module';
import { UsersModule } from './modules/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [ConfigModule.forRoot({isGlobal:true}),TypeOrmModule.forRoot({
    type:'mysql',
    host:process.env.DB_HOST,
    port:parseInt(<string>process.env.DB_PORT),
    username:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_NAME,
    // autoLoadEntities:true,
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize:true

  }), PostsModule, FeedbacksModule, ReportsModule, SharesModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
