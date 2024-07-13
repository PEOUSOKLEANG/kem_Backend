import { Body, Controller, Post, Req, UseGuards } from "@nestjs/common";
import { AuthService } from "../services/auth.service";
import { CreateUserDto } from "src/modules/users/dto/create-user.dto";
import { SignInDto } from "../dto/signin.dto";
import { AccessTokenGuard } from "src/common/guards/accessToken.guard";
import { OtpService } from "../services/otp.service";

@Controller('auth')
export class AuthsController{
    constructor(
      private readonly authsService:AuthService,
      private readonly otpService: OtpService
     ) {}
  
    //logout 
  @UseGuards(AccessTokenGuard)
  @Post('logout')
  async logout( @Req() req  ){
    console.log("user:",req);
    
    return await this.authsService.logout(req.user.sub)
  }
    
  @Post('register')
  async register(@Body() registerDto:CreateUserDto){
    return await this.authsService.register(registerDto);
  }

  // login 
  // @UseGuards(AccessTokenGuard)
  @Post('signin')
  async signIn (@Body() signInDto:SignInDto ){
    console.log(signInDto);
    return await this.authsService.signIn(signInDto);
  }
  @Post('send-otp')
  async sendOTP(@Body('email') email: string) {
    await this.otpService.sendOTP(email);
    return { message: 'OTP sent' };
  }

  @Post('verify-otp')
  async verifyOTP(@Body('email') email: string, @Body('otp') otp: string) {
    const isValid = this.otpService.verifyOTP(email, otp);
    if (isValid) {
      return { message: 'OTP verified' };
    }
    return { message: 'Invalid OTP' };
  }


  //refresh token
  

  // @Post('send-code')
  // async sendVerificationCode(@Body('phoneNumber') phoneNumber: string) {
  //   await this.authsService.sendVerificationCode(phoneNumber);
  //   return { message: 'Verification code sent' };
  // }
}