import { Column, Entity, PrimaryGeneratedColumn, BaseEntity, ManyToOne, OneToMany } from 'typeorm';

// Entities
import { Competition } from '../competition/competition.entity';
import { CompetitionMatch } from '../competition-match/competition-match.entity';

export interface ClubExtServiceData {
  extSeviceName: 'Api-Football';
  id: number;
}

@Entity('Club')
export class Club extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ type: 'varchar', length: '100', unique: true })
  public name: string;

  @Column({ type: 'varchar', length: '150', nullable: true })
  public logoUrl?: string;

  @Column({ type: 'jsonb', nullable: true })
  public extService?: ClubExtServiceData;

  @ManyToOne(
    () => Competition,
    competition => competition.clubs,
  )
  competition: Competition;

  @OneToMany(
    () => CompetitionMatch,
    match => match.home,
  )
  hostMatches: CompetitionMatch[];

  @OneToMany(
    () => CompetitionMatch,
    competition => competition.visit,
  )
  visitingMatches: CompetitionMatch[];
}
