import { Controller, Get, Post, UseGuards, Body } from '@nestjs/common';

// Guards
import { JwtAuthGuard } from '../auth/auth.guard.jwt';
// Components
import { CompetitionMatchService } from './competition-match.service';
// DTO
// import { CreateCompetitionMatchDto } from './dto/competition-match.create.dto';

@Controller('/competition-match')
export class CompetitionMatchController {
  constructor(private readonly competitionMatchService: CompetitionMatchService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAll() {
    return await this.competitionMatchService.findAll();
  }

  // @UseGuards(JwtAuthGuard)
  // @Post()
  // async PostOne(@Body() createCompetitionMatchDto: CreateCompetitionMatchDto) {
  //   return await this.competitionMatchService.create(createCompetitionMatchDto);
  // }
}
