// Services
import { HttpService, Injectable, HttpException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ApiFootballService {
  constructor(private httpService: HttpService, private configService: ConfigService) {}

  async getCountries() {
    try {
      const { data } = await this.httpService.get('/countries').toPromise();
      return data.api;
    } catch (e) {
      const errorMessage = e.response.data?.message || e.response.statusText;
      throw new HttpException(errorMessage, e.response.status);
    }
  }
}
