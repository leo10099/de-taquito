// Services
import { HttpService, Injectable, HttpException } from '@nestjs/common';

@Injectable()
export class ApiFootballService {
  constructor(private httpService: HttpService) {}

  async getCountries() {
    try {
      const { data } = await this.httpService.get('/countries').toPromise();
      return data.api;
    } catch (e) {
      const errorMessage = e.response.data?.message || e.response.statusText;
      throw new HttpException(errorMessage, e.response.status);
    }
  }

  async getSeasons() {
    try {
      const { data } = await this.httpService.get('/seasons').toPromise();
      return data.api;
    } catch (e) {
      const errorMessage = e.response.data?.message || e.response.statusText;
      throw new HttpException(errorMessage, e.response.status);
    }
  }

  async getLeague(id: string) {
    try {
      const { data } = await this.httpService.get(`/leagues/league/${id}`).toPromise();
      return data.api;
    } catch (e) {
      const errorMessage = e.response.data?.message || e.response.statusText;
      throw new HttpException(errorMessage, e.response.status);
    }
  }

  async getSeason(season: string) {
    try {
      const { data } = await this.httpService.get(`/leagues/season/${season}`).toPromise();
      return data.api;
    } catch (e) {
      const errorMessage = e.response.data?.message || e.response.statusText;
      throw new HttpException(errorMessage, e.response.status);
    }
  }

  async getStandings(league: string) {
    try {
      const { data } = await this.httpService.get(`/leagueTable/${league}`).toPromise();
      return data.api;
    } catch (e) {
      const errorMessage = e.response.data?.message || e.response.statusText;
      throw new HttpException(errorMessage, e.response.status);
    }
  }
}
