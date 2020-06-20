import { Controller, Get, UseGuards } from '@nestjs/common';

// Guards
import { JwtAuthGuard } from '../auth/auth.guard.jwt';

// Components
import { LeagueService } from './league.service';

@Controller('/league')
export class LeagueController {
  constructor(private readonly leagueService: LeagueService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/')
  async getAll() {
    return await this.leagueService.findAll();
  }
}
