import { Module } from '@nestjs/common';

// Modules
import { ConfigModule } from '@nestjs/config';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { MailgunModule } from '../../services/Mailgun/Mailgun.module';

// Components
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

// Services
import { ConfigService } from '@nestjs/config';
import { MailgunService } from '../../services/Mailgun/Mailgun.service';

// Passport
import { LocalStrategy } from './auth.local.strategy';
import { GoogleStrategy } from './auth.google.strategy';
import { CookieStrategy } from './auth.cookie.strategy';

// Types
import { MainConfig } from '../../config/configuration';
import { JwtStrategy } from './auth.jwt.stategy';

@Module({
  imports: [
    UserModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get(MainConfig.JTW_SECRET),
      }),
      inject: [ConfigService],
    }),
    MailgunModule,
  ],
  providers: [
    ConfigService,
    AuthService,
    LocalStrategy,
    CookieStrategy,
    JwtStrategy,
    GoogleStrategy,
    MailgunService,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
