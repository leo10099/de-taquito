import { EntityRepository, Repository } from 'typeorm';

// Components
import { CompetitionFixture } from './competition-fixture.entity';

@EntityRepository(CompetitionFixture)
export class CompetitionFixtureRepository extends Repository<CompetitionFixture> {}
