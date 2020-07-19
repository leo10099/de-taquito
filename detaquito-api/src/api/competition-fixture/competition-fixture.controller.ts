import { Controller, Get, Post, UseGuards, Body } from '@nestjs/common';

// Guards
import { JwtAuthGuard } from '../auth/auth.guard.jwt';
// Components
import { CompetitionFixtureService } from './competition-fixture.service';
// DTO
import { CreateCompetitionFixtureDto } from './dto/competition-fixture.create.dto';

@Controller('/competition-fixture')
export class CompetitionFixtureController {
  constructor(private readonly competitionFixtureService: CompetitionFixtureService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAll() {
    return await this.competitionFixtureService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async PostOne(@Body() createCompetitionFixtureDto: CreateCompetitionFixtureDto) {
    return await this.competitionFixtureService.create(createCompetitionFixtureDto);
  }
}
