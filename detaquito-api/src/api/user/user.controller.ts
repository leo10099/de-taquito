import { Controller, Get, Request, UseGuards, Query } from '@nestjs/common';

// Guards
import { JwtAuthGuard } from '../auth/auth.guard.jwt';

// Components
import { UserService } from './user.service';

@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/current')
  getCurrent(@Request() req) {
    return req.user;
  }

  @Get('/existing')
  async getExistingUser(
    @Query('email') email: string,
    @Query('alias') alias: string,
  ): Promise<boolean> {
    if (!email && !alias) {
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

    return false;
  }
}
