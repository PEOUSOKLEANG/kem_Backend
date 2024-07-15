import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ROLE_KEY } from '../decorators/role.decorator';
import { Role } from 'src/modules/users/entities/role.entity';

@Injectable()
export class SystemRolesGuard implements CanActivate {

  constructor(private reflector: Reflector) { }

  canActivate(context: ExecutionContext,):
    boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.getAllAndOverride<Role[]>(ROLE_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    console.log("-------------------- user -------------------");
    
    console.log(user);
    // Role roles = 
    

    if (roles.some((role: any) => user?.role.name == (role)) == false) {
      throw new ForbiddenException('មិនមានការអនុញ្ញាត');
    }
    return true
  }

}
