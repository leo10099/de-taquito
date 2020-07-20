import { EntityRepository, Repository } from 'typeorm';

// Components
import { CompetitionMatchweek } from './competition-matchweek.entity';

@EntityRepository(CompetitionMatchweek)
export class CompetitionMatchweekRepository extends Repository<CompetitionMatchweek> {}
