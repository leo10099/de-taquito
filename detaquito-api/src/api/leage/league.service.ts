import { Injectable } from '@nestjs/common';

// Entity
import { League } from './league.entity';
// Repository
import { LeagueRepository } from './league.repository';
// Dto
import { CreateLeagueDto } from './dto/league.create.dto';

@Injectable()
export class LeagueService {
  constructor(public leagueRepo: LeagueRepository) {}

  async findAll(): Promise<League[]> {
    return await this.leagueRepo.find();
  }

  async create(createLeagueDto: CreateLeagueDto): Promise<League> {
    return await this.leagueRepo.create(createLeagueDto).save();
  }
}
