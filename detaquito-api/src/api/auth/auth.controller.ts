import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { FastifyReply } from 'fastify';

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
import { RecoverPasswordRequestDto } from './dto/recover.password.request.dto';
import { ReplaceForgottenPasswordtDto } from './dto/replace.password.dto';

// Types
import { TokenAuthorizationPayload } from '../../typings';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UsePipes(ValidationPipe)
  @Post('/local/register')
  @TransformClassToPlain()
  async localRegister(
    @Body() localRegisterDto: CreateUserDtoLocalStrategy,
    @Res() response: FastifyReply,
  ) {
    const createdUser = await this.authService.localSignUp(localRegisterDto);
    return await this.login(createdUser, response);
  }

  @UseGuards(LocalAuthGuard)
  @Post('/local/login')
  async login(@User() user: UserEntity, @Res() response: FastifyReply): Promise<FastifyReply> {
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
      id: user.id,
      alias: user.alias,
      avatar: user.avatarUrl,
      email: user.email,
    });
  }

  @UseGuards(GoogleAuthGuard)
  @Get('/google')
  googleLogin() {
    // Initiates the Google OAuth2 login flow
  }

  @UseGuards(GoogleAuthGuard)
  @Get('/google/callback')
  async googleLoginCallback(@Req() request, @Res() response: FastifyReply) {
    const tokenPayload: TokenAuthorizationPayload = await this.authService.logUserIn(request.user);

    response.setCookie('token', tokenPayload.refreshToken, {
      httpOnly: true,
      maxAge: tokenPayload.cookieExpiry,
      path: '/',
      secure: false,
    });

    return response.redirect(302, '/app/dashboard');
  }

  @Post('/google/mobile')
  async googleMobileAuthentication(@Body() body): Promise<TokenAuthorizationPayload> {
    const user = (await this.authService.socialAuthentication(body)) as UserEntity;
    return await this.authService.logUserIn(user);
  }

  @UseGuards(CookieGuard)
  @Post('/refresh')
  refreshToken(@Req() req) {
    return this.authService.refreshToken(req.user);
  }

  @Get('/forgot')
  async recoverPassword(@Query('token') recoveryToken: string, @Res() response: FastifyReply) {
    return response.redirect(302, `/auth/forgot?token=${recoveryToken}`);
  }

  @Post('/forgot')
  async recoverPasswordRequest(@Body() recoverPasswordRequestDto: RecoverPasswordRequestDto) {
    return this.authService.recoverPasswordRequest(recoverPasswordRequestDto.email);
  }

  @Post('/forgot/replace')
  async replaceForgottenPassword(@Body() replacePasswordDto: ReplaceForgottenPasswordtDto) {
    return await this.authService.replaceForgottenPassword(
      replacePasswordDto.id,
      replacePasswordDto.secret,
    );
  }

  @Post('/logout')
  async logout(@Res() response: FastifyReply){
    response.setCookie('token', '', {
      httpOnly: true,
      maxAge: 0,
      path: '/',
      secure: false,
    });

    return response.redirect(302, '/');
  }
}
