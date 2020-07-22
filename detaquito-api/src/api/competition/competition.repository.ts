import { EntityRepository, Repository } from 'typeorm';

// Components
import { Competition } from './competition.entity';

@EntityRepository(Competition)
export class CompetitionRepository extends Repository<Competition> {
  async getById(id: number) {
    return await this.findOne(id);
  }
}
