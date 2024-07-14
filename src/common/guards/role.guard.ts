// import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
// import { Reflector } from "@nestjs/core";
// import { Observable } from "rxjs";
// import { ROLE_KEY } from "../decorators/role.decorator";
// import { Role } from "../enum/role.enum";

// @Injectable()
// export class RoleGuard implements CanActivate{
//     constructor(private reflector:Reflector){}

//     canActivate(context: ExecutionContext): boolean  {
//         const requiredRole = this.reflector.getAllAndOverride(ROLE_KEY,[
//             context.getHandler(),
//             context.getClass(),
//         ])
//         if (!requiredRole) return true;
       
//         const {request} = context.switchToHttp().getRequest();

//         if(requiredRole.some((role:Role)=>request.role ===role)) return true;
//         throw new ForbiddenException(
//             'Your role is not allow',
//           );
//         ;
//     }

// }
// import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
// import { Reflector } from "@nestjs/core";
// import { ROLE_KEY } from "../decorators/role.decorator";
// import { Role } from "../enum/role.enum";

// @Injectable()
// export class RoleGuard implements CanActivate {
//     constructor(private reflector: Reflector) {}

//     canActivate(context: ExecutionContext): boolean {
//         const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLE_KEY, [
//             context.getHandler(),
//             context.getClass(),
//         ]);

//         if (!requiredRoles || requiredRoles.length === 0) {
//             return true;
//         }

//         const request = context.switchToHttp().getRequest();
//         const user = request.user;

//         if (!user || !user.role) {
//             throw new ForbiddenException('User role not found.');
//         }

//         const userRole = user.role;

//         if (requiredRoles.includes(userRole)) {
//             return true;
//         }

//         throw new ForbiddenException('Your role is not allowed.');
//     }
// }

    import {
        Injectable,
        CanActivate,
        ExecutionContext,
        ForbiddenException,
        UnauthorizedException,
    } from '@nestjs/common';
    import { Reflector } from '@nestjs/core';
    import { ROLE_KEY } from "../decorators/role.decorator";
    import { JwtService } from '@nestjs/jwt';
    import { UsersService } from 'src/modules/users/services/users.service';
    import { Role } from '../enum/role.enum';
  
  @Injectable()
  export class RolesGuard implements CanActivate {
    constructor(
      private reflector: Reflector,
      private readonly userService: UsersService,
      private jwtService: JwtService,
    ) {}
  
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLE_KEY, [
        context.getHandler(),
        context.getClass(),
      ]);
  
      console.log('Required roles:', requiredRoles);
  
      if (!requiredRoles) {
        return true;
      }
  
      const request = context.switchToHttp().getRequest();
      const authorizationHeader = request.headers?.authorization;
  
      if (!authorizationHeader) {
        throw new UnauthorizedException('Authorization header must be provided');
      }
  
      const token = authorizationHeader.split('Bearer ')[1];
  
      if (!token) {
        throw new UnauthorizedException('Token must be provided');
      }
  
      try {
        const payload = this.jwtService.verify(token, {
          secret: process.env.JWT_ACCESS_SECRET,
        });
  
        console.log('Payload:', payload);
  
        if (!payload) {
          throw new UnauthorizedException('Invalid token');
        }
  
        const userRole = payload.role;
  
        console.log('User role:', userRole);
  
        if (!requiredRoles.includes(userRole)) {
          throw new ForbiddenException('Your role is not allowed');
        }
  
        return true;
      } catch (err) {
        console.error('JWT error:', err);
  
        if (err.message.includes('jwt expired')) {
          throw new UnauthorizedException('Token has expired');
        } else if (err.message.includes('jwt must be provided')) {
          throw new UnauthorizedException('Token must be provided');
        } else if (err.message.includes('jwt malformed')) {
          throw new UnauthorizedException('Token is invalid');
        }
  
        throw new UnauthorizedException('Unauthorized');
      }
    }
  }
  
