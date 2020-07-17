import { Column, Entity, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

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
}
