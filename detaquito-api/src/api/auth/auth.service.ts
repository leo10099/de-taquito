import { add, differenceInSeconds } from 'date-fns';
import {
  Injectable,
  UnauthorizedException,
  ConflictException,
  HttpException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';

// Services
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { MailgunService } from '../../services/Mailgun/Mailgun.service';

// Entities
import { User } from '../user/user.entity';

// DTOs
import { CreateUserDtoLocalStrategy } from '../user/dto/create.user.dto.local';

// Errors
import { UserErrors } from '../user/user.errors';

// Typings
import { MainConfig } from '../../config/configuration';
import { TokenAuthorizationPayload, HashedPassword } from '../../typings';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService,
    private mailgunService: MailgunService,
  ) {}

  async validateUser(email: string, secret: string): Promise<User> {
    // We check if the user exists
    const existingUser = await this.userService.findOneByEmail(email);

    if (!existingUser) {
      throw new UnauthorizedException();
    }

    if (!existingUser.secret && existingUser.googleId) {
      throw new HttpException('User should authenticate using Google Sign-In', 400);
    }

    // We check if the given password is correct
    const isPasswordValid = await this.userService.verifyPassword(existingUser.secret, secret);

    if (!isPasswordValid) {
      throw new UnauthorizedException();
    }

    return existingUser;
  }

  async localSignUp(localRegisterDto: CreateUserDtoLocalStrategy) {
    const existingUser = await this.userService.findOneByEmail(localRegisterDto.email);

    // Check if there is a record
    if (existingUser) {
      // Check if user is registered with social OAuth provider
      if (existingUser.googleId) {
        // Already registered with Google. Update user to allow local authentication
        return await this.userService.editUser(existingUser.id, localRegisterDto);
      }
      // User already registered, throw error
      throw new ConflictException(UserErrors.USER_ERROR_EMAIL_EXISTS);
    }

    // Email not found, create user
    return await this.userService.createUserLocalStrategy(localRegisterDto);
  }

  async logUserIn(user: User) {
    const currentTime = new Date();
    const timeOffset = currentTime.getTimezoneOffset() * 60;

    // Emit access token with expiry date for auto silent refresh in client
    const accessTokenExpiry = this.configService.get(MainConfig.JWT_ACCESS_TOKEN_EXPIRY);
    const accessTokenExpiryInMinutes = add(currentTime, {
      minutes: accessTokenExpiry,
    });
    const accessTokenExpiryInSeconds = differenceInSeconds(accessTokenExpiryInMinutes, currentTime);
    const accessToken = await this.emitToken(user, accessTokenExpiryInSeconds);

    // Emit refresh token for authorization renewal and set it in HTTP-Only cookie
    const refreshTokenExpiry = this.configService.get(MainConfig.JWT_REFRESH_TOKEN_EXPIRY);
    const refreshTokenExpiryInDays = add(currentTime, { days: refreshTokenExpiry });
    const refreshTokenExpiryInSeconds = differenceInSeconds(refreshTokenExpiryInDays, currentTime);
    const refreshToken = await this.emitToken(user, refreshTokenExpiryInSeconds);

    // Adjust cookie expiry to UTC time offset
    const cookieExpiry = refreshTokenExpiryInSeconds - timeOffset;

    return {
      accessToken,
      refreshToken,
      cookieExpiry,
      accessTokenExpiryInSeconds,
      refreshTokenExpiryInSeconds,
    } as TokenAuthorizationPayload;
  }

  async socialAuthentication(profile: any): Promise<User | boolean | void> {
    const { provider, id, displayName } = profile;
    const { value: email } = profile.emails[0];

    if (provider === 'google') {
      // Check if user exists in database
      const existingUser = await this.userService.findOneByEmail(email);

      // Check Google ID, if it matches, log the user in
      if (existingUser?.googleId && existingUser.googleId === id) return existingUser;

      /* If it exists and has a secret, it means user already registered with local
       strategy. Link Google ID to account and login */
      if (existingUser?.secret) {
        return await this.userService.editUser(existingUser.id, {
          googleId: id,
          alias: displayName,
        });
      }

      // User is brand-new, create in database
      return await this.userService.createUserSocialStrategy({
        email,
        googleId: id,
        alias: displayName,
      });
    }
  }

  async recoverPasswordRequest(email?: string): Promise<HttpException | boolean> {
    const existingUser = await this.userService.findOneByEmail(email);
    if (!existingUser) {
      return new HttpException('Email not found', 400);
    }

    try {
      // Generate recovery token and persist
      const forgotSecretToken = await this.jwtService.signAsync(email + Date.now());
      await this.userService.editUser(existingUser.id, { forgotSecretToken });
      // Send e-mail with recovery token
      await this.mailgunService.sendEmailWithRecoverPasswordToken(email, forgotSecretToken);

      return true;
    } catch (e) {
      Logger.error(e, 'Mailgun');
      return new InternalServerErrorException();
    }
  }

  async replaceForgottenPassword(id: number, newPassword: string) {
    // If secret present, hash password
    const { hashedPassword: secret, salt }: HashedPassword = await this.userService.hashPassword(
      newPassword,
      32,
    );

    const updatedUser = await this.userService.editUser(id, {
      secret,
      salt,
      forgotSecretToken: null,
    });

    return updatedUser ? '' : new InternalServerErrorException();
  }

  async refreshToken(user: User) {
    return await this.logUserIn(user);
  }

  async emitToken(user: User, expiresIn: number): Promise<string> {
    // TODO --> use async method
    return this.jwtService.sign(
      {
        email: user.email,
        avatar: user.avatarUrl,
        alias: user.alias,
      },
      {
        subject: user.id.toString(),
        expiresIn,
      },
    );
  }
}
