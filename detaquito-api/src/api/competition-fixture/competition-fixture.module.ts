import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Components
import { CompetitionFixtureController } from './competition-fixture.controller';
import { CompetitionFixtureService } from './competition-fixture.service';
import { CompetitionFixtureRepository } from './competition-fixture.repository';

@Module({
  imports: [TypeOrmModule.forFeature([CompetitionFixtureRepository])],
  providers: [CompetitionFixtureService],
  controllers: [CompetitionFixtureController],
  exports: [CompetitionFixtureService],
})
export class CompetitionFixtureModule {}
