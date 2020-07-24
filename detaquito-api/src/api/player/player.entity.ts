import {
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  JoinColumn,
  OneToOne,
  OneToMany,
} from 'typeorm';

// Entities
import { User } from '../user/user.entity';
import { Prediction } from '../prediction/prediction.entity';

@Entity('Player')
export class Player extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @OneToMany(
    () => Prediction,
    prediction => prediction.player,
    { cascade: ['insert', 'update'] },
  )
  predictions: Prediction[];
}
