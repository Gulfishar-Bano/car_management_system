// auth.service.ts
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  private readonly users = [
    {
      username: 'admin',
      password: 'admin123',
      token: 'valid-token',
    },
  ];

  validateUser(username: string, password: string): string | null {
    const user = this.users.find(
      (u) => u.username === username && u.password === password,
    );
    return user ? user.token : null;
  }

  isTokenValid(token: string): boolean {
    return this.users.some((user) => user.token === token);
  }
}
