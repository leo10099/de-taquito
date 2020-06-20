import { Injectable } from '@nestjs/common';

// Passport
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';

// Typings
import { GoogleOauthConfig } from '../../config/configuration';

// Services
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService, private readonly configService: ConfigService) {
    super({
      accessType: 'offline',
      callbackURL: 'api/auth/google/callback',
      clientID: configService.get(GoogleOauthConfig.CLIENT_ID),
      clientSecret: configService.get(GoogleOauthConfig.CLIENT_SECRET),
      proxy: true,
      scope: ['profile', 'email'],
      session: false,
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any, done: any) {
    const result = await this.authService.socialAuthentication(profile);
    return done(null, result);
  }
}
