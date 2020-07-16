import { Column, Entity, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

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

  @Column({ type: 'varchar', length: '100', nullable: true })
  public logoUrl?: string;

  @Column({ type: 'jsonb', nullable: true })
  public extService?: ClubExtServiceData;
}
