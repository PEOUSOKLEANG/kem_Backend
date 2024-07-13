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
import { AuthModule } from './modules/auth/auth.module';
import { ReportsService } from './modules/reports/services/reports.service';
import { ChatsModule } from './modules/chats/chats.module';
import { AdminModule } from './modules/admin/admin.module';
import { ChatimageModule } from './modules/chatimage/chatimage.module';
import { ProfileimageModule } from './modules/profileimage/profileimage.module';
import { PostimageModule } from './modules/postimage/postimage.module';
import OtpEmailConfig from './config/OtpEmailConfig';

@Module({
  imports: [ConfigModule.forRoot({isGlobal:true,load: [OtpEmailConfig]} ),TypeOrmModule.forRoot({
    // type:'mysql',
    // host:process.env.DB_HOST,
    // port:parseInt(<string>process.env.DB_PORT),
    // username:process.env.DB_USER,
    // password:process.env.DB_PASSWORD,
    // database:process.env.DB_NAME,
    // // autoLoadEntities:true,
    // entities: [__dirname + '/**/*.entity{.ts,.js}'],
    // synchronize:true
    type:'postgres',
    host: process.env.POSTGRES_HOST,
    port: parseInt(<string>process.env.POSTGRES_PORT),
    username:process.env.POSTGRES_USER,
    password:process.env.POSTGRES_PASSWORD,
    database:process.env.POSTGRES_DATABASE,
    // autoLoadEntities:true,
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize:true

  }), PostsModule, FeedbacksModule, ReportsModule, SharesModule, 
  UsersModule, AuthModule, ChatsModule, AdminModule, 
  ChatimageModule, ProfileimageModule, PostimageModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
