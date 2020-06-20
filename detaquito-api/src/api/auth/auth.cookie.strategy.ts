import { verify } from 'jsonwebtoken';
import { Strategy } from 'passport-cookie';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';

// Entities
import { User } from '../user/user.entity';

// Typings
import { MainConfig } from '../../config/configuration';
import { JwtTokenPayload } from '../../typings';

// Service
import { ConfigService } from '@nestjs/config';
import { UserService } from '../user/user.service';

@Injectable()
export class CookieStrategy extends PassportStrategy(Strategy, 'cookie') {
  constructor(private userService: UserService, private readonly configService: ConfigService) {
    super();
  }

  async validate(token: string, done: Function): Promise<void> {
    try {
      const refreshTokenSecret = this.configService.get(MainConfig.JTW_SECRET);
      const decodedToken = verify(token, refreshTokenSecret) as JwtTokenPayload;
      const authorizedUser = await this.userService.findOneByEmail(decodedToken.email);

      if (!authorizedUser) throw new UnauthorizedException();

      done(null, authorizedUser);
    } catch (e) {
      throw new UnauthorizedException();
    }
  }
}
