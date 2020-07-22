import { Column, Entity, PrimaryGeneratedColumn, BaseEntity, ManyToOne, OneToMany } from 'typeorm';

// Entities
import { Competition } from '../competition/competition.entity';
import { CompetitionMatch } from '../competition-match/competition-match.entity';

export interface CompetitionMatchweekExtServiceData {
  extSeviceName: 'Api-Football';
  id: number;
}

@Entity('CompetitionMatchweek')
export class CompetitionMatchweek extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ type: 'smallint' })
  public number: number;

  @Column({ type: 'bool', default: false })
  public isCurrent: boolean;

  @Column({ type: 'jsonb', nullable: true })
  public extService?: CompetitionMatchweekExtServiceData;

  @ManyToOne(
    () => Competition,
    competition => competition.matchweeks,
  )
  competition: Competition;

  @OneToMany(
    () => CompetitionMatch,
    competitionMatch => competitionMatch.matchweek,
  )
  matches: CompetitionMatch[];
}
