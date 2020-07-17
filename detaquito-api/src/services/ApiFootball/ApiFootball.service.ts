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
    const { data } = await this.httpService.get(`/competitions/competition/${id}`).toPromise();
    return data.api;
  }

  async getSeason(season: string) {
    const { data } = await this.httpService.get(`/competitions/season/${season}`).toPromise();
    return data.api;
  }

  async getStandings(competition: string) {
    const { data } = await this.httpService.get(`/competitionTable/${competition}`).toPromise();
    return data.api;
  }

  async getClubs(competition: string) {
    const { data } = await this.httpService.get(`/teams/competition/${competition}`).toPromise();
    return data.api;
  }
}
