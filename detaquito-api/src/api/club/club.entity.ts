import { Column, Entity, PrimaryGeneratedColumn, BaseEntity, ManyToOne, OneToMany } from 'typeorm';

// Entities
import { User } from '../user/user.entity';
import { Competition } from '../competition/competition.entity';
import { CompetitionMatch } from '../competition-match/competition-match.entity';

export interface ClubExtServiceData {
  active: boolean;
  id: number;
}

@Entity('Club')
export class Club extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ type: 'varchar', length: '100' })
  public name: string;

  @Column({ type: 'varchar', length: '150', nullable: true })
  public logoUrl?: string;

  @Column({ type: 'jsonb', nullable: true })
  public extService?: ClubExtServiceData;

  @ManyToOne(
    () => Competition,
    competition => competition.clubs,
    { eager: true },
  )
  competition: Competition;

  @OneToMany(
    () => CompetitionMatch,
    match => match.home,
  )
  hostMatches: CompetitionMatch[];

  @OneToMany(
    () => User,
    user => user.club,
  )
  users: User[];

  @OneToMany(
    () => CompetitionMatch,
    competition => competition.visit,
  )
  visitingMatches: CompetitionMatch[];
}
