import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Components
import { LeagueController } from './league.controller';
import { LeagueService } from './league.service';
import { LeagueRepository } from './league.repository';

@Module({
  imports: [TypeOrmModule.forFeature([LeagueRepository])],
  providers: [LeagueService],
  controllers: [LeagueController],
  exports: [LeagueService],
})
export class LeagueModule {}
