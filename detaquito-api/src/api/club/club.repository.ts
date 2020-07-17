import { EntityRepository, Repository } from 'typeorm';

// Components
import { Club } from './club.entity';

@EntityRepository(Club)
export class ClubRepository extends Repository<Club> {}