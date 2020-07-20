import { Injectable } from '@nestjs/common';

// Entity
import { CompetitionMatchweek } from './competition-matchweek.entity';
// Repository
import { CompetitionMatchweekRepository } from './competition-matchweek.repository';
// Dto
import { CreateCompetitionMatchweekDto } from './dto/competition-matchweek.create.dto';

@Injectable()
export class CompetitionMatchweekService {
  constructor(public competitionMatchweekRepo: CompetitionMatchweekRepository) {}

  async findAll(): Promise<CompetitionMatchweek[]> {
    return await this.competitionMatchweekRepo.find();
  }

  async create(
    createCompetitionMatchweekDto: CreateCompetitionMatchweekDto,
  ): Promise<CompetitionMatchweek> {
    return await this.competitionMatchweekRepo.create(createCompetitionMatchweekDto).save();
  }
}
