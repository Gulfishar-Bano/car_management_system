
import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() body: { username: string; password: string }) {
    const { username, password } = body;
    const token = this.authService.validateUser(username, password);

    if (!token) {
      return { message: 'Invalid credentials' };
    }

    return {
      message: 'Login successful',
      token: token, 
    };
  }
}
