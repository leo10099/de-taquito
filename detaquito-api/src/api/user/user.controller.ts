import {
  Controller,
  Get,
  Request,
  UseGuards,
  UseInterceptors,
  Query,
  ClassSerializerInterceptor,
} from '@nestjs/common';

// Guards
import { JwtAuthGuard } from '../auth/auth.guard.jwt';

// Components
import { UserService } from './user.service';
import { User } from './user.entity';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/current')
  getCurrent(@Request() req) {
    return req.user;
  }

  @Get('/existing')
  async findUser(
    @Query('email') email: string,
    @Query('alias') alias: string,
    @Query('resetToken') passwordResetToken: string,
  ): Promise<boolean | User> {
    if (!email && !alias && !passwordResetToken) {
      return;
    }
    if (email) {
      const userDoesExist = await this.userService.findOneByEmail(email.trim());
      if (userDoesExist) return true;
    }
    if (alias) {
      const userDoesExist = await this.userService.findOneByAlias(alias.trim());
      if (userDoesExist) return true;
    }
    if (passwordResetToken) {
      const foundUser: User = await this.userService.findOneByAttribute({
        forgotSecretToken: passwordResetToken,
      });

      return foundUser;
    }

    return false;
  }
}
