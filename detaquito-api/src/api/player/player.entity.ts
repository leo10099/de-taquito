import { Entity, PrimaryGeneratedColumn, BaseEntity, JoinColumn, OneToOne } from 'typeorm';

// Entities
import { User } from '../user/user.entity';

@Entity('Player')
export class Player extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;
}
