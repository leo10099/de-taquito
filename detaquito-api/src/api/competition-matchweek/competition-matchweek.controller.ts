import { Controller, Get, Post, UseGuards, Body, Param } from '@nestjs/common';

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
  @Get('/generate/:competition')
  async generateNextMatchweekForCompetition(@Param() param: { competition: string }) {
    return await this.competitionMatchweekService.generateNextMatchweek(param.competition);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async PostOne(@Body() createCompetitionMatchweekDto: CreateCompetitionMatchweekDto) {
    return await this.competitionMatchweekService.create(createCompetitionMatchweekDto);
  }
}
