// Services
import { HttpService, Injectable } from '@nestjs/common';

@Injectable()
export class ApiFootballService {
  constructor(private httpService: HttpService) {}

  async getCountries() {
    const { data } = await this.httpService.get('/countries').toPromise();
    return data.api;
  }

  async getSeasons() {
    const { data } = await this.httpService.get('/seasons').toPromise();
    return data.api;
  }

  async getLeague(id: string) {
    const { data } = await this.httpService.get(`/leagues/league/${id}`).toPromise();
    return data.api;
  }

  async getSeason(season: string) {
    const { data } = await this.httpService.get(`/leagues/season/${season}`).toPromise();
    return data.api;
  }

  async getStandings(league: string) {
    const { data } = await this.httpService.get(`/leagueTable/${league}`).toPromise();
    return data.api;
  }
}
