import {
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  JoinColumn,
  ManyToOne,
  Column,
  OneToOne,
} from 'typeorm';

// Entities
import { Player } from '../player/player.entity';
import { CompetitionMatch } from '../competition-match/competition-match.entity';

// Types
import { MatchResult } from '../../typings';

@Entity('Prediction')
export class Prediction extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ type: 'smallint', nullable: true })
  homeGoals?: number;

  @Column({ type: 'smallint', nullable: true })
  awayGoals?: number;

  @Column({ type: 'enum', enum: MatchResult })
  result: MatchResult;

  @ManyToOne(
    () => CompetitionMatch,
    competitionMatch => competitionMatch.predictions,
  )
  @JoinColumn()
  competitionMatch: CompetitionMatch;

  @ManyToOne(() => Player)
  @JoinColumn()
  player: Player;
}
