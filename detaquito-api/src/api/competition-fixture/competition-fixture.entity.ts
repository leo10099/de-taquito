import { Column, Entity, PrimaryGeneratedColumn, BaseEntity, ManyToOne } from 'typeorm';

// Entities
import { Competition } from '../competition/competition.entity';

export interface CompetitionFixtureExtServiceData {
  extSeviceName: 'Api-Football';
  id: number;
}

@Entity('CompetitionFixture')
export class CompetitionFixture extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ type: 'smallint' })
  public number: number;

  @Column({ type: 'jsonb', nullable: true })
  public extService?: CompetitionFixtureExtServiceData;

  @ManyToOne(
    () => Competition,
    competition => competition.fixtures,
  )
  competition: Competition;
}
