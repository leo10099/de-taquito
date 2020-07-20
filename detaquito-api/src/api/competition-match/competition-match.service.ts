import { Injectable } from '@nestjs/common';

// Entity
import { CompetitionMatch } from './competition-match.entity';
// Repository
import { CompetitionMatchRepository } from './competition-match.repository';
// Dto
// import { CreateCompetitionMatchDto } from './dto/competition-match.create.dto';

@Injectable()
export class CompetitionMatchService {
  constructor(public competitionMatchRepo: CompetitionMatchRepository) {}

  async findAll(): Promise<CompetitionMatch[]> {
    return await this.competitionMatchRepo.find();
  }

  // async create(createCompetitionMatchDto: CreateCompetitionMatchDto): Promise<CompetitionMatch> {
  //   return await this.competitionMatchRepo.create(createCompetitionMatchDto).save();
  // }
}
