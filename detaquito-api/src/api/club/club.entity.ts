import { Column, Entity, PrimaryGeneratedColumn, BaseEntity, ManyToOne } from 'typeorm';

// Entities
import { Competition } from '../competition/competition.entity';

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
}
