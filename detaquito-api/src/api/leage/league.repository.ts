import { EntityRepository, Repository } from 'typeorm';

// Components
import { League } from './league.entity';

@EntityRepository(League)
export class LeagueRepository extends Repository<League> {
  async selectAll() {
    return await this.find();
  }
}
