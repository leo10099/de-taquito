import { Column, Entity, PrimaryGeneratedColumn, BaseEntity, OneToMany } from 'typeorm';

// Entities
import { Club } from '../club/club.entity';
import { CompetitionMatchweek } from '../competition-matchweek/competition-matchweek.entity';

export interface CompetitionExtServiceData {
  extSeviceName: 'Api-Football';
  id: number;
}

@Entity('Competition')
export class Competition extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ type: 'varchar', length: '100', unique: true })
  public name: string;

  @Column({ type: 'varchar', length: '50' })
  public country: string;

  @Column({ type: 'varchar', nullable: true, length: '100' })
  public logoUrl?: string;

  @Column({ type: 'jsonb', nullable: true })
  public extService?: CompetitionExtServiceData;

  @OneToMany(
    () => Club,
    club => club.competition,
  )
  clubs: Club[];

  @OneToMany(
    () => CompetitionMatchweek,
    CompetitionMatchweek => CompetitionMatchweek.competition,
  )
  matchweeks: CompetitionMatchweek[];
}
