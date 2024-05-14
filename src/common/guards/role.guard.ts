import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { ROLE_KEY } from "../decorators/role.decorator";
import { Role } from "../enum/role.enum";

@Injectable()
export class RoleGuard implements CanActivate{
    constructor(private reflector:Reflector){}

    canActivate(context: ExecutionContext): boolean  {
        const requiredRole = this.reflector.getAllAndOverride(ROLE_KEY,[
            context.getHandler(),
            context.getClass(),
        ])
        if (!requiredRole) return true;
       
        const {request} = context.switchToHttp().getRequest();

        if(requiredRole.some((role:Role)=>request.role ===role)) return true;
        throw new ForbiddenException(
            'Your role is not allow',
          );
        // if(!requriedRole) return false;
        // return true;
        // throw new Error("Method not implemented.");
    }

}