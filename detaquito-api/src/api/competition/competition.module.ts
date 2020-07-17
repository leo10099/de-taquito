import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Components
import { CompetitionController } from './competition.controller';
import { CompetitionService } from './competition.service';
import { CompetitionRepository } from './competition.repository';

@Module({
  imports: [TypeOrmModule.forFeature([CompetitionRepository])],
  providers: [CompetitionService],
  controllers: [CompetitionController],
  exports: [CompetitionService],
})
export class CompetitionModule {}
