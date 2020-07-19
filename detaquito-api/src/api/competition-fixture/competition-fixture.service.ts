import { Injectable } from '@nestjs/common';

// Entity
import { CompetitionFixture } from './competition-fixture.entity';
// Repository
import { CompetitionFixtureRepository } from './competition-fixture.repository';
// Dto
import { CreateCompetitionFixtureDto } from './dto/competition-fixture.create.dto';

@Injectable()
export class CompetitionFixtureService {
  constructor(public competitionFixtureRepo: CompetitionFixtureRepository) {}

  async findAll(): Promise<CompetitionFixture[]> {
    return await this.competitionFixtureRepo.find();
  }

  async create(
    createCompetitionFixtureDto: CreateCompetitionFixtureDto,
  ): Promise<CompetitionFixture> {
    return await this.competitionFixtureRepo.create(createCompetitionFixtureDto).save();
  }
}
