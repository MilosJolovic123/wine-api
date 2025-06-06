import {
    CanActivate,
    ExecutionContext,
    ForbiddenException,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
  import { JwtService } from '@nestjs/jwt';
  import { jwtConstants } from './constants';
  import { Request } from 'express';
  import { Reflector } from '@nestjs/core';
//ovako zapravo stitimo endpoint-ove tako sto trazimo validan JWT token
  @Injectable()
  export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService, private reflector:Reflector) {}
  
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const request = context.switchToHttp().getRequest();
      const token = this.extractTokenFromHeader(request);
      if (!token) {
        throw new UnauthorizedException('Vaš jwt token nije prisutan!');
      }
      try {
        const payload = await this.jwtService.verifyAsync(
          token,
          {
            secret: jwtConstants.secret
          }
        );
        request['user'] = payload;
      } catch {
        throw new UnauthorizedException('Okinuo je exception na nekom visem nivou!');
      }
      const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler());

    if (requiredRoles && requiredRoles.length > 0) {
      const user = request['user'];
      if (!user || !requiredRoles.includes(user.role)) {
        throw new ForbiddenException('Nemate permisije da pristupite datom resursu!');
      }
    }
      return true;
    }
  
    private extractTokenFromCookie(request: Request): string | undefined {
      return request.cookies['jwt'];
    }



    private extractTokenFromHeader(request: Request): string | undefined {
      const [type, token] = request.headers.authorization?.split(' ') ?? [];
      return type === 'Bearer' ? token : undefined;
    }
  }