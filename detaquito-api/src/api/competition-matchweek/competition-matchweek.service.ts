import {
  Injectable,
  HttpException,
  HttpStatus,
  InternalServerErrorException,
} from '@nestjs/common';

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
import { areIntervalsOverlapping } from 'date-fns/esm';

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
    try {
    } catch (error) {}
    // Find the competition this Matchweeks belongs to
    const competition: Competition = await this.competitionService.findOneById(
      parseInt(competitionId, 10),
    );

    if (!competition) {
      return new HttpException(
        `Couldn't find competition with ID ${competitionId}`,
        HttpStatus.NOT_FOUND,
      );
    }

    // Get matchweek from external service
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

    // Check if this matchweek has already been generated
    const matchWeekNumber = Number(extServiceNextMatches.fixtures[0].round.split('-')[1].trim());
    const matchweekAlreadyExists = await this.competitionMatchweekRepo.findOne({
      where: { number: matchWeekNumber },
    });

    if (matchweekAlreadyExists) {
      return new InternalServerErrorException('Matchweek has already been generated');
    }

    // Create matches of this matchweek apapting external service matches to our model
    const matches: CompetitionMatch[] = [];

    for (const extServiceNextMatch of extServiceNextMatches.fixtures) {
      const [homeTeam, awayTeam] = await Promise.all([
        await this.clubService.findByExternalServiceId(extServiceNextMatch.homeTeam.team_id),
        await this.clubService.findByExternalServiceId(extServiceNextMatch.awayTeam.team_id),
      ]);

      const match = new CompetitionMatch();
      match.visit = awayTeam;
      match.home = homeTeam;
      match.extService = {
        id: extServiceNextMatch.fixture_id,
        extSeviceName: 'Api-Football',
      };

      matches.push(match);
    }

    const matchweek = new CompetitionMatchweek();
    matchweek.number = matchWeekNumber;
    matchweek.competition = competition;
    matchweek.isCurrent = true;
    matchweek.extService = {
      extSeviceName: 'Api-Football',
      id: extServiceNextMatches.fixtures[0].round,
    };
    matchweek.matches = matches;

    return await matchweek.save();
  }

  async create(
    createCompetitionMatchweekDto: CreateCompetitionMatchweekDto,
  ): Promise<CompetitionMatchweek> {
    return await this.competitionMatchweekRepo.create(createCompetitionMatchweekDto).save();
  }
}
