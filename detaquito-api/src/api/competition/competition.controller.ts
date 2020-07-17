import { Controller, Get, Post, UseGuards, Body } from '@nestjs/common';

// Guards
import { JwtAuthGuard } from '../auth/auth.guard.jwt';
// Components
import { CompetitionService } from './competition.service';
// DTO
import { CreateCompetitionDto } from './dto/competition.create.dto';

@Controller('/competition')
export class CompetitionController {
  constructor(private readonly competitionService: CompetitionService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAll() {
    return await this.competitionService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async PostOne(@Body() createCompetitionDto: CreateCompetitionDto) {
    return await this.competitionService.create(createCompetitionDto);
  }
}
