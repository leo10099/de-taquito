import { Column, Entity, PrimaryGeneratedColumn, BaseEntity, OneToOne } from 'typeorm';
import { Exclude } from 'class-transformer';

// Entities
import { Player } from '../player/player.entity';

@Entity('User')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ type: 'varchar', length: '50', unique: true })
  public email: string;

  @Column({ type: 'varchar', length: '50', unique: true })
  public alias: string;

  @Column({ default: 'http://detaquito.com/imagen.jpg' })
  public avatarUrl: string;

  @Column({ nullable: true })
  public favTeam?: string;

  @Column({ nullable: true })
  public fullName?: string;

  @Exclude()
  @Column({ type: 'varchar', nullable: true })
  public salt?: string;

  @Exclude()
  @Column({ nullable: true })
  public secret?: string;

  @Exclude()
  @Column({ nullable: true })
  public googleId?: string;

  @Exclude()
  @Column({ type: 'varchar', nullable: true })
  public forgotSecretToken?;

  @OneToOne(
    () => Player,
    player => player.user,
    { nullable: true },
  )
  player?: User;

  constructor(partial: Partial<User>) {
    super();
    Object.assign(this, partial);
  }
}
