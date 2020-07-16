import { Controller, Get, Param } from '@nestjs/common';

// Components
import { ApiFootballService } from './ApiFootball.service';

@Controller('/api-football')
export class ApiFootballController {
  constructor(private readonly apiFootball: ApiFootballService) {}

  @Get('/countries')
  async countries() {
    return await this.apiFootball.getCountries();
  }

  @Get('/seasons')
  async seasons() {
    return await this.apiFootball.getSeasons();
  }

  @Get('league/:league')
  async league(@Param() param: { league: string }) {
    return await this.apiFootball.getLeague(param.league);
  }

  @Get('/season/:season')
  async season(@Param() param: { season: string }) {
    return await this.apiFootball.getSeason(param.season);
  }

  @Get('standings/:league')
  async stadings(@Param() param: { league: string }) {
    return await this.apiFootball.getStandings(param.league);
  }
}
