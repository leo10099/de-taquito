import { Controller, Get, Post, UseGuards, Body } from '@nestjs/common';

// Guards
import { JwtAuthGuard } from '../auth/auth.guard.jwt';
// Components
import { LeagueService } from './league.service';
// DTO
import { CreateLeagueDto } from './dto/league.create.dto';

@Controller('/league')
export class LeagueController {
  constructor(private readonly leagueService: LeagueService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAll() {
    return await this.leagueService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async PostOne(@Body() createLeagueDto: CreateLeagueDto) {
    return await this.leagueService.create(createLeagueDto);
  }
}
