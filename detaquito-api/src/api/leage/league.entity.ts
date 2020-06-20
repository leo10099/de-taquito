import { Column, Entity, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

export interface LeagueExtServiceData {
  extSeviceName: 'Api-Football';
  id: number;
}

@Entity('League')
export class League extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ type: 'varchar', length: '100', unique: true })
  public name: string;

  @Column({ type: 'varchar', length: '100' })
  public countryCode: string;

  @Column({ type: 'varchar', nullable: true })
  public logoUrl?: string;

  @Column({ type: 'jsonb', nullable: true })
  public extService?: LeagueExtServiceData;
}
