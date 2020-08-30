import { Injectable } from '@nestjs/common';

// Entity
import { Player } from './player.entity';
// Repository
import { PlayerRepository } from './player.repository';

@Injectable()
export class PlayerService {
  constructor(public playerRepo: PlayerRepository) {}

  async findAll(): Promise<Player[] | null> {
    return await this.playerRepo.find();
  }

  async findOne(id: string | number): Promise<Player | null> {
    return this.playerRepo.findOne(Number(id));
  }

  // async create(createClubDto: CreateClubDto): Promise<Club> {
  //   return await this.clubRepo.create(createClubDto).save();
  // }
}
