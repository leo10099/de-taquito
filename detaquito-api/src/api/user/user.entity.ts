import { Column, Entity, PrimaryGeneratedColumn, BaseEntity, OneToOne, ManyToOne } from 'typeorm';
import { Exclude } from 'class-transformer';

// Entities
import { Player } from '../player/player.entity';
import { Club } from '../club/club.entity';

@Entity('User')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ type: 'varchar', length: '50', unique: true })
  public email: string;

  @Column({ type: 'varchar', length: '50', unique: true })
  public alias: string;

  @Column({ nullable: true })
  public avatarUrl: string;

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

  @ManyToOne(
    () => Club,
    club => club.users,
    { eager: true },
  )
  club?: Club;

  constructor(partial: Partial<User>) {
    super();
    Object.assign(this, partial);
  }
}
