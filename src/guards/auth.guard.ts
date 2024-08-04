import {
  CanActivate,
  Injectable,
  ExecutionContext,
  UnauthorizedException,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token)
      throw new UnauthorizedException({
        status: 'error',
        message: 'Authorization token not provided',
        statusCode: HttpStatus.UNAUTHORIZED,
      });

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });
      if (this.isExpiredToken(payload))
        throw new UnauthorizedException({
          status: 'error',
          statusCode: HttpStatus.UNAUTHORIZED,
        });
      request['user'] = payload;
      request['token'] = token;
    } catch (error) {
      throw new BadRequestException({
        status: 'error',
        message: error.message,
        statusCode: HttpStatus.BAD_REQUEST,
      });
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  private isExpiredToken(payload: any) {
    const currentTime = Math.floor(Date.now() / 1000);
    if (payload.exp < currentTime) {
      return true;
    }
    return false;
  }
}
