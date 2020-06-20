import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from '../user/user.entity';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email',
      passwordField: 'secret',
    });
  }

  async validate(email: string, secret: string): Promise<User> {
    const user = await this.authService.validateUser(email, secret);

    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
