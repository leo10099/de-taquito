import { Injectable } from '@nestjs/common';

// Entity
import { Competition } from './competition.entity';
// Repository
import { CompetitionRepository } from './competition.repository';
// Dto
import { CreateCompetitionDto } from './dto/competition.create.dto';

@Injectable()
export class CompetitionService {
  constructor(public competitionRepo: CompetitionRepository) {}

  async findAll(): Promise<Competition[]> {
    return await this.competitionRepo.find();
  }

  async create(createCompetitionDto: CreateCompetitionDto): Promise<Competition> {
    return await this.competitionRepo.create(createCompetitionDto).save();
  }
}
