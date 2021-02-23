import { EntityRepository, Repository } from 'typeorm';

// Components
import { Club } from './club.entity';

@EntityRepository(Club)
export class ClubRepository extends Repository<Club> {
  async selectByExternalService(id: string) {
    return this.createQueryBuilder('club')
      .where('club.extService @> :extService', { extService: { id: parseInt(id,  10) } })
      .getOne();
  }

  async selectActiveByCompetitionId(competitionId: string) {
    return this.createQueryBuilder('club')
      .where('club.competitionId = :competitionId', {competitionId: parseInt(competitionId, 10)})
      .andWhere('club.extService @> :extService', {
        extService: { active: true },
      })
      .orderBy('club.name')
      .getMany();
  }
}
