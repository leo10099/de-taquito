import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Components
import { CompetitionMatchweekController } from './competition-matchweek.controller';
import { CompetitionMatchweekService } from './competition-matchweek.service';
import { CompetitionMatchweekRepository } from './competition-matchweek.repository';

@Module({
  imports: [TypeOrmModule.forFeature([CompetitionMatchweekRepository])],
  providers: [CompetitionMatchweekService],
  controllers: [CompetitionMatchweekController],
  exports: [CompetitionMatchweekService],
})
export class CompetitionMatchweekModule {}
