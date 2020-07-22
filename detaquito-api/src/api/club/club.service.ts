import { Injectable } from '@nestjs/common';

// Entity
import { Club } from './club.entity';
// Repository
import { ClubRepository } from './club.repository';
// Dto
import { CreateClubDto } from './dto/club.create.dto';

@Injectable()
export class ClubService {
  constructor(public clubRepo: ClubRepository) {}

  async findAll(): Promise<Club[]> {
    return await this.clubRepo.find();
  }

  async findByExternalServiceId(id: number) {
    return await this.clubRepo.selectByField({ extService: id });
  }

  async create(createClubDto: CreateClubDto): Promise<Club> {
    return await this.clubRepo.create(createClubDto).save();
  }
}
