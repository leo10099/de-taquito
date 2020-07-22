import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Components
import { CompetitionMatchweekController } from './competition-matchweek.controller';
import { CompetitionMatchweekService } from './competition-matchweek.service';
import { CompetitionMatchweekRepository } from './competition-matchweek.repository';

// Modules
import { ApiFootballModule } from '../../services/ApiFootball/ApiFootball.module';
import { CompetitionModule } from '../competition/competition.module';
import { ClubModule } from '../club/club.module';

// Services
import { ApiFootballService } from '../../services/ApiFootball/ApiFootball.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([CompetitionMatchweekRepository]),
    CompetitionModule,
    ApiFootballModule,
    ClubModule,
  ],
  providers: [CompetitionMatchweekService, ApiFootballService],
  controllers: [CompetitionMatchweekController],
  exports: [CompetitionMatchweekService],
})
export class CompetitionMatchweekModule {}
