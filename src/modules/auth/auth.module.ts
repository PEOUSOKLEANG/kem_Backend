import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Otp } from './entities/otp.entity';
import { JwtModule } from '@nestjs/jwt';
import { AccessTokenStrategy } from './strategies/accessToken.strategy';
import { RefreshTokenStrategy } from './strategies/refreshToken.strategy';
import { UsersModule } from '../users/users.module';
import { User } from '../users/entities/user.entity';
import { Auth } from './entities/auth.entity';


@Module({
  imports:[
    TypeOrmModule.forFeature([Otp,User,Auth]),
    JwtModule.register({
      // global:true
    }),UsersModule],
  controllers: [],
  providers: [AuthService,AccessTokenStrategy, RefreshTokenStrategy],
  exports:[AuthService]
})
export class AuthModule {}
