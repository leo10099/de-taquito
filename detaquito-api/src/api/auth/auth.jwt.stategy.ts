import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

// Services
import { ConfigService } from '@nestjs/config';

// Types
import { MainConfig } from '../../config/configuration';
import { JwtTokenPayload } from '../../typings';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get(MainConfig.JTW_SECRET),
    });
  }

  async validate(payload: JwtTokenPayload) {
    return payload;
  }
}
