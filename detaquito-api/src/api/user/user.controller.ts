import {
  Controller,
  Get,
  Request,
  UseGuards,
  UseInterceptors,
  Query,
  ClassSerializerInterceptor,
  NotFoundException,
  Patch,
} from '@nestjs/common';

// Guards
import { JwtAuthGuard } from '../auth/auth.guard.jwt';

// Components
import { UserService } from './user.service';
import { User } from './user.entity';

// User Decorator
import { User as UserData } from './user.decorator';

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
  ): Promise<boolean | User | NotFoundException> {
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

      if (foundUser) return foundUser;
    }

    return new NotFoundException();
  }

  @UseGuards(JwtAuthGuard)
  @Patch()
  async UpdateUser(@Request() req, @UserData('id') userId) {
    console.log('ID', userId);
    this.userService.editUser(userId, req);
  }
}
