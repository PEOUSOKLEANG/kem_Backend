import { Body, Controller, Post, Req, UseGuards } from "@nestjs/common";
import { AuthService } from "../auth.service";
import { CreateUserDto } from "src/modules/users/dto/create-user.dto";
import { SignInDto } from "../dto/signin.dto";
import { AccessTokenGuard } from "src/common/guards/accessToken.guard";

@Controller('auth')
export class AuthsController{
    constructor(private readonly authsService:AuthService ) {}
    
    
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
  //logout 
  @UseGuards(AccessTokenGuard)
  @Post('logout')
  async logout( @Req() req,refreshToken:null ){
    return await this.authsService.logout(req.user_id, refreshToken)
  }
}