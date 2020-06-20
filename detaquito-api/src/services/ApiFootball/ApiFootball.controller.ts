import { Controller, Get } from '@nestjs/common';

// Components
import { ApiFootballService } from './ApiFootball.service';

@Controller('/api-football')
export class ApiFootballController {
  constructor(private readonly apiFootball: ApiFootballService) {}

  @Get('/countries')
  async getCountries() {
    return await this.apiFootball.getCountries();
  }
}
