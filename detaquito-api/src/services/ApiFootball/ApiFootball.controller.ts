import { Controller, Get, Param, UseFilters } from '@nestjs/common';

// Components
import { ApiFootballService } from './ApiFootball.service';

// Error Handler
import { ApiFootballErrorHandler } from './ApiFootbal.filters';

@Controller('/api-football')
export class ApiFootballController {
  constructor(private readonly apiFootball: ApiFootballService) {}

  @UseFilters(ApiFootballErrorHandler)
  @Get('/countries')
  async countries() {
    return await this.apiFootball.getCountries();
  }

  @UseFilters(ApiFootballErrorHandler)
  @Get('/seasons')
  async seasons() {
    return await this.apiFootball.getSeasons();
  }

  @UseFilters(ApiFootballErrorHandler)
  @Get('league/:league')
  async league(@Param() param: { league: string }) {
    return await this.apiFootball.getLeague(param.league);
  }

  @UseFilters(ApiFootballErrorHandler)
  @Get('/season/:season')
  async season(@Param() param: { season: string }) {
    return await this.apiFootball.getSeason(param.season);
  }

  @UseFilters(ApiFootballErrorHandler)
  @Get('standings/:league')
  async stadings(@Param() param: { league: string }) {
    return await this.apiFootball.getStandings(param.league);
  }

  @UseFilters(ApiFootballErrorHandler)
  @Get('clubs/:league')
  async clubs(@Param() param: { league: string }) {
    return await this.apiFootball.getClubs(param.league);
  }
}
