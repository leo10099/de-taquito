import { Column, Entity, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';
import { Exclude } from 'class-transformer';

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

  @Exclude({ toPlainOnly: true })
  @Column({ type: 'varchar', nullable: true })
  public salt?: string;

  @Exclude({ toPlainOnly: true })
  @Column({ nullable: true })
  public secret?: string;

  @Exclude({ toPlainOnly: true })
  @Column({ nullable: true })
  public googleId?: string;

  @Exclude({ toPlainOnly: true })
  @Column({ type: 'varchar', nullable: true })
  public forgotSecretToken?;

  constructor(partial: Partial<User>) {
    super();
    Object.assign(this, partial);
  }
}
