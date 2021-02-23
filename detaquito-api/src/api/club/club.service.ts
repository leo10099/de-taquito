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

  async findAllActiveGroupedByCompetition(): Promise<{ [key: string]: Club }> {
    const allActiveClubs = await this.clubRepo.find({ relations: ['competition'] });
    const output = {};

    allActiveClubs.forEach(activeClub => {
      if (!output[activeClub.competition.country]) {
        output[activeClub.competition.country] = [];
        output[activeClub.competition.country].push({
          id: activeClub.id,
          name: activeClub.name,
          logoUrl: activeClub.logoUrl,
        });
      } else {
        output[activeClub.competition.country].push({
          id: activeClub.id,
          name: activeClub.name,
          logoUrl: activeClub.logoUrl,
        });
      }
    });

    return output;
  }

  async findAllActiveByCompetition(competitonId: string): Promise<Club[]> {
    return await this.clubRepo.selectActiveByCompetitionId(competitonId);
  }

  async findByExternalServiceId(id: string | number) {
    return this.clubRepo.selectByExternalService(id.toString());
  }

  async create(createClubDto: CreateClubDto): Promise<Club> {
    return await this.clubRepo.create(createClubDto).save();
  }
}
