import { BadRequestException, ForbiddenException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAuthDto } from '../dto/create-auth.dto';
import { UpdateAuthDto } from '../dto/update-auth.dto';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { NumericType, Repository } from 'typeorm';
import { Otp } from '../entities/otp.entity';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../../users/services/users.service';
import { CreateUserDto } from '../../users/dto/create-user.dto';
import { User } from '../../users/entities/user.entity';
import { Auth } from '../entities/auth.entity';
import { SignInDto } from '../dto/signin.dto';
// import { TwilioService } from './twilio.service';
// import { SignIn, SignInDto } from './dto/signin.dto';


@Injectable()
export class AuthService {
  constructor(
  @InjectRepository(Otp) private otpRepository:Repository<Otp>,
  @InjectRepository(Auth) private authRepository:Repository<Auth>,
  @InjectRepository(User) private userRepository:Repository<User>,
  private configService: ConfigService,
  private jwtService: JwtService,
  private readonly usersService: UsersService,
  // private readonly twilioService: TwilioService
){}

// get Token 


  //generate OTP user_id is got for the date username 
  async saveOTP(username:string){
    const generateOTP = Math.floor(100000 + Math.random()*900000).toString();
    const otp = new Otp();
    otp.otp = generateOTP
    otp.username =username
    await this.otpRepository.save(otp);
  }
//delete OTP
  async deleteOtp(otp:string){
    const isOTP = await this.otpRepository.findOne({where:{otp:otp},select:{id:true}});
    await this.otpRepository.delete(isOTP.id);
  }

  //validate Otp
  async checkOtp(otp:string){
    const isOtp = await this.otpRepository.findOne({where:{otp:otp}});
    const currentDate = new Date();
    const isExpird = await this.otpRepository.createQueryBuilder('otp')
    .where('otp.expirationDate< :currentDate ',{currentDate})
    .getMany();
    //expird time
    if(isOtp && !isExpird){
      await this.deleteOtp(otp)
    }
    // need check time expried 
    else if (!isOtp && !isExpird){
      return{
        message:'incorrect',
        statusCode:HttpStatus.BAD_REQUEST
      }
    }
    else if(isOtp && isExpird){
      return{
        message:'Otp is expried',
        statusCode:HttpStatus.FORBIDDEN
      }
    }
  } 


  //send Otp 
  // async sendOtp (username:string , type:string , otp:string){

  //   await this.saveOTP



  // }


  async getTokens(userId: number, username: string,role:string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          role,
          sub: userId,
          username,
        },
        {
          secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
          expiresIn: '15m',
        },
      ),
      this.jwtService.signAsync(
        {
          role,
          sub: userId,
          username,
        },
        {
          secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
          expiresIn: '7d',
        },
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }
  // register 
  async register(registerDto:CreateUserDto){
    // const [phone_number] = registerDto.phone_number;
    const existedUser = await this.usersService.existedUser(registerDto.email , registerDto.username, registerDto.phone_number)
    console.log(existedUser);
    
    try {
      if(!existedUser) {
        const newUser = new User();
        newUser.username = registerDto.username
        newUser.firstname = registerDto.firstname
        newUser.lastname = registerDto.lastname
        newUser.gender = registerDto.gender
        newUser.phone_number = registerDto.phone_number
        newUser.password =  registerDto.password
        newUser.location = registerDto.location
        newUser.email = registerDto.email
        newUser.role=registerDto.role
        newUser.dob = registerDto.dob
        newUser.create_at = new Date()
        console.log(newUser);
        // validate otp
        await this.userRepository.save(newUser);

        
        //save refresh token
        const token = await this.getTokens(newUser.id, newUser.username , newUser.role);
        await this.saveRefreshToken(newUser.id ,newUser.username)
        console.log(token);
        
            console.log(newUser);
            return {
                message: `${newUser.username}, register is successful`,
                statusCode: HttpStatus.OK,
                token
            }
        }    
      if(existedUser) throw Error;
    } catch (error) {
      // if(error.existedUser)
        // return existedUser;
        throw new HttpException({
            status:HttpStatus.BAD_REQUEST,
            message:existedUser

        },HttpStatus.BAD_REQUEST)
    } 
          
  }

//to save referesh Token
  async saveRefreshToken(userId:number,refreshToken:string){
    
    const hashRefreshToken = await bcrypt.hash(refreshToken, 10);
    const isuser = await this.userRepository.findOne({where:{id:userId}});
    const auth = new Auth();
    auth.user = isuser
    auth.refresh_token = hashRefreshToken
    await this.authRepository.save(auth);
  }

  //update token 
  async UpdateRefreshToken(userId: number , refreshToken: string){
    const hashRefreshToken = await bcrypt.hash(refreshToken, 10);
    const user = await this.userRepository.findOne({where:{id:userId}}) 
    const isAuth = await this.authRepository.findOne({where:{user:user}});
    // if(isAuth.user.id !== user.id)
    isAuth.refresh_token = hashRefreshToken 
    // console.log(isAuth);
    
    await this.authRepository.save(isAuth);

  }



  //login
  async signIn(signInDto:SignInDto ){
    const user = await this.usersService.validateUser(signInDto.inputvalue ,signInDto.type);
    // console.log(user);
    
    if(!user) throw new BadRequestException('User does not exist');
    if(!await user.validatePassword(signInDto.password)){
      throw new BadRequestException('Password is incorrect')
    }
    // console.log(signInDto);
    
    const tokens = await this.getTokens(user.id,user.username,user.role)
    // await this.updateRefreshToken(user.id,tokens.refreshToken);
    await this.UpdateRefreshToken(user.id,tokens.refreshToken);
    return tokens;
  }
  



  //log out
  async logout(user_id:number ){
    // return await this.authRepository.update(user_id,{refresh_token:null})
    await this.authRepository.update(user_id,{refresh_token:null})
    return{
      statusCode:HttpStatus.OK,
      message:`User is logout`
    };

  }

  // refresh token when user accessed denie

  async refreshTokens(userId:number , refreshtoken:string){
    const isUser = await this.userRepository.findOne({where:{id:userId}}) 
    const isValid = await this.authRepository.findOne({where:{user:isUser}})
    if(!isValid || !isValid.refresh_token) throw new ForbiddenException('Access Denied')

      const refreshTokenMatch = await bcrypt.compare(refreshtoken,isValid.refresh_token)
    if(!refreshTokenMatch)throw new ForbiddenException('Access Denied');

    const tokens = await this.getTokens(isUser.id,isUser.username,isUser.role);
    // await this.updateRefreshToken(isUser.id, tokens.refreshToken);
    await this.UpdateRefreshToken(isUser.id, tokens.refreshToken);
    return tokens;
  }

  
}



