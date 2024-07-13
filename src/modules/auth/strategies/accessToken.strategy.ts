import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

// type JwtPayload = {
//   id: number;
//   username: string;
  
// };

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_ACCESS_SECRET,
    });
  }

  
  // validate(payload: JwtPayload) {
  //   console.log('date:',payload);

  //   return payload;
  // }


  validate(payload:any) {
    // console.log('date:',pa);
    console.log(payload);
    
    return payload;
  }
}