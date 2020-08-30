import { EntityRepository, Repository } from 'typeorm';

// Components
import { Player } from './player.entity';

@EntityRepository(Player)
export class PlayerRepository extends Repository<Player> {}
