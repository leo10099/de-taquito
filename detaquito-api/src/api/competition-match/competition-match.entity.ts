import { Column, Entity, PrimaryGeneratedColumn, BaseEntity, ManyToOne, OneToMany } from 'typeorm';

// Entities
import { CompetitionMatchweek } from '../competition-matchweek/competition-matchweek.entity';
import { Club } from '../club/club.entity';

export interface CompetitionMatchExtServiceData {
  extSeviceName: 'Api-Football';
  id: number;
}

@Entity('CompetitionMatch')
export class CompetitionMatch extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ type: 'jsonb', nullable: true })
  public extService?: CompetitionMatchExtServiceData;

  @Column({ type: 'boolean', default: false })
  public hasBeenPlayed?: boolean;

  @Column({ type: 'smallint', default: 0 })
  public homeGoals?: number;

  @Column({ type: 'smallint', default: 0 })
  public awayGoals?: number;

  @ManyToOne(
    () => Club,
    club => club.hostMatches,
  )
  home: Club;

  @ManyToOne(
    () => Club,
    club => club.visitingMatches,
  )
  visit: Club;

  @ManyToOne(
    () => CompetitionMatchweek,
    competitionMatchweek => competitionMatchweek.matches,
  )
  matchweek: CompetitionMatchweek;
}
