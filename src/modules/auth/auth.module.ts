import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Otp } from './entities/otp.entity';
import { JwtModule } from '@nestjs/jwt';
import { AccessTokenStrategy } from './strategies/accessToken.strategy';
import { RefreshTokenStrategy } from './strategies/refreshToken.strategy';
import { UsersModule } from '../users/users.module';
import { User } from '../users/entities/user.entity';
import { Auth } from './entities/auth.entity';
import { AuthsController } from './controllers/auths.controller';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { EmailService } from './services/email.service';
import { OtpService } from './services/otp.service';
// import { TwilioService } from './services/twilio.service';

@Module({
  imports:[
    TypeOrmModule.forFeature([Otp,User,Auth]),
    JwtModule.register({}),
    UsersModule,

  ],
  controllers: [AuthsController],
  providers: [AuthService,AccessTokenStrategy, 
    RefreshTokenStrategy,EmailService, OtpService,
    // TwilioService 
  ],
  exports:[AuthService , 
    // TwilioService

  ]
})
export class AuthModule {}
