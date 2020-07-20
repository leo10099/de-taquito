import { EntityRepository, Repository } from 'typeorm';

// Components
import { CompetitionMatch } from './competition-match.entity';

@EntityRepository(CompetitionMatch)
export class CompetitionMatchRepository extends Repository<CompetitionMatch> {}
