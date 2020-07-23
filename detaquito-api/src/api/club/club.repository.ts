import { EntityRepository, Repository } from 'typeorm';

// Components
import { Club } from './club.entity';

@EntityRepository(Club)
export class ClubRepository extends Repository<Club> {
  async selectByExternalService(id: string) {
    return this.createQueryBuilder('club')
      .where('club.extService ::jsonb @> :extService', { extService: { id } })
      .getOne();
  }
}
