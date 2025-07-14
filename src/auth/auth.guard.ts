import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
  import { AuthService } from './auth.service';
  
  @Injectable()
  export class AuthGuard implements CanActivate {
    constructor(private readonly authService: AuthService) {}
  
    canActivate(context: ExecutionContext): boolean {
      const request = context.switchToHttp().getRequest();
      const authHeader = request.headers['authorization'];
  
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new UnauthorizedException('Invalid or missing token');
      }
  
      // Extract only the token string (remove 'Bearer ')
      const token = authHeader.split(' ')[1];
  
      // Validate token
      if (!this.authService.isTokenValid(token)) {
        throw new UnauthorizedException('Invalid token');
      }
  
      return true;
    }
  }
  