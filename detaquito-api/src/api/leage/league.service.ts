import { Injectable } from '@nestjs/common';

// Entity
import { League } from './league.entity';
// Repository
import { LeagueRepository } from './league.repository';

@Injectable()
export class LeagueService {
  constructor(public leagueRepo: LeagueRepository) {}

  async findAll(): Promise<League[]> {
    return await this.leagueRepo.selectAll();
  }
}
