import { Controller, Get, Post, UseGuards, Body } from '@nestjs/common';

// Guards
import { JwtAuthGuard } from '../auth/auth.guard.jwt';
// Components
import { CompetitionMatchweekService } from './competition-matchweek.service';
// DTO
import { CreateCompetitionMatchweekDto } from './dto/competition-matchweek.create.dto';

@Controller('/competition-matchweek')
export class CompetitionMatchweekController {
  constructor(private readonly competitionMatchweekService: CompetitionMatchweekService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAll() {
    return await this.competitionMatchweekService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async PostOne(@Body() createCompetitionMatchweekDto: CreateCompetitionMatchweekDto) {
    return await this.competitionMatchweekService.create(createCompetitionMatchweekDto);
  }
}
