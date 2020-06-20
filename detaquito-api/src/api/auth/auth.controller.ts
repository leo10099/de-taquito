import {
  Controller,
  Get,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
  Req,
  Res,
  Body,
} from '@nestjs/common';
import { ServerResponse, ServerOptions } from 'http';
import { FastifyRequest, FastifyReply } from 'fastify';

// Guards
import { LocalAuthGuard } from './auth.local.guard';
import { GoogleAuthGuard } from './auth.google.guard';
import { CookieGuard } from './auth.cookie.guard';

// Services
import { TransformClassToPlain } from 'class-transformer';
import { AuthService } from './auth.service';

// Decorators
import { User } from '../user/user.decorator';

// Entitites
import { User as UserEntity } from '../user/user.entity';

// DTOs
import { CreateUserDtoLocalStrategy } from '../user/dto/create.user.dto.local';
import { TokenAuthorizationPayload } from 'src/typings';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UsePipes(ValidationPipe)
  @Post('/local/register')
  @TransformClassToPlain()
  async localRegister(
    @Body() localRegisterDto: CreateUserDtoLocalStrategy,
    @Res() response: FastifyReply<ServerResponse>,
  ) {
    const createdUser = await this.authService.localSignUp(localRegisterDto);
    return await this.login(createdUser, response);
  }

  @UseGuards(LocalAuthGuard)
  @Post('/local/login')
  async login(
    @User() user: UserEntity,
    @Res() response: FastifyReply<ServerResponse>,
  ): Promise<FastifyReply<ServerResponse>> {
    const tokenPayload: TokenAuthorizationPayload = await this.authService.logUserIn(user);

    response.setCookie('token', tokenPayload.refreshToken, {
      httpOnly: true,
      maxAge: tokenPayload.cookieExpiry,
      path: '/',
      secure: false,
    });

    return response.send({
      accessToken: tokenPayload.accessToken,
      accessTokenExpiry: tokenPayload.accessTokenExpiryInSeconds,
      refreshToken: tokenPayload.refreshToken,
      refreshTokenExpiry: tokenPayload.refreshTokenExpiryInSeconds,
    });
  }

  @UseGuards(GoogleAuthGuard)
  @Get('/google')
  googleLogin() {
    console.log('google flow...');
    // Initiates the Google OAuth2 login flow
  }

  @UseGuards(GoogleAuthGuard)
  @Get('/google/callback')
  async googleLoginCallback(@Req() request, @Res() response: FastifyReply<ServerResponse>) {
    const tokenPayload: TokenAuthorizationPayload = await this.authService.logUserIn(request.user);

    response.setCookie('token', tokenPayload.refreshToken, {
      httpOnly: true,
      maxAge: tokenPayload.cookieExpiry,
      path: '/',
      secure: false,
    });

    return response.redirect(302, '/app/dashboard');
  }

  @UseGuards(CookieGuard)
  @Post('/refresh')
  refreshToken(@Req() req) {
    return this.authService.refreshToken(req.user);
  }
}
