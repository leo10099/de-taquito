import { Injectable, HttpException, HttpStatus } from '@nestjs/common';

// Entity
import { CompetitionMatchweek } from './competition-matchweek.entity';
// Repository
import { CompetitionMatchweekRepository } from './competition-matchweek.repository';
// Dto
import { CreateCompetitionMatchweekDto } from './dto/competition-matchweek.create.dto';

// Services
import { ApiFootballService } from '../../services/ApiFootball/ApiFootball.service';
import { CompetitionService } from '../competition/competition.service';
import { ClubService } from '../club/club.service';
// Entities
import { Competition } from '../competition/competition.entity';
import { CompetitionMatch } from '../competition-match/competition-match.entity';

@Injectable()
export class CompetitionMatchweekService {
  constructor(
    public competitionMatchweekRepo: CompetitionMatchweekRepository,
    public competitionService: CompetitionService,
    public clubService: ClubService,
    public apiFootballService: ApiFootballService,
  ) {}

  async findAll(): Promise<CompetitionMatchweek[]> {
    return await this.competitionMatchweekRepo.find();
  }

  async generateNextMatchweek(competitionId: string) {
    const competition: Competition = await this.competitionService.findOneById(
      parseInt(competitionId, 10),
    );

    if (!competition) {
      return new HttpException(
        `Couldn't find competition with ID ${competitionId}`,
        HttpStatus.NOT_FOUND,
      );
    }

    const extServiceNextMatches = await this.apiFootballService.getNextMatchesForLeague(
      competition.extService?.id,
      competition.matchesPerMatchweek,
    );

    if (!extServiceNextMatches || !extServiceNextMatches.fixtures?.length) {
      return new HttpException(
        `Couldn't find next matches for competition with ID ${competitionId}`,
        HttpStatus.NOT_FOUND,
      );
    }

    // const fixtureCreationTasks = await extServiceNextMatches.fixtures.map(
    //   async (match: any, index) => {
    //     const awayTeam = await this.clubService.findByExternalServiceId(match.awayTeam.team_id);
    //     const homeTeam = await this.clubService.findByExternalServiceId(match.homeTeam.team_id);
    //     console.log('awayTeam', awayTeam);
    //     return {
    //       number: index + 1,
    //       extService: 'Api-Football',
    //       hasBeenPlayed: false,
    //       home: homeTeam.id,
    //       away: awayTeam.id,
    //     };
    //   },
    // );

    // const matches = Promise.all(fixtureCreationTasks);

    // console.log('matches', matches);
  }

  async create(
    createCompetitionMatchweekDto: CreateCompetitionMatchweekDto,
  ): Promise<CompetitionMatchweek> {
    return await this.competitionMatchweekRepo.create(createCompetitionMatchweekDto).save();
  }
}
