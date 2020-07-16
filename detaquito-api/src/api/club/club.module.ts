import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Components
import { ClubController } from './club.controller';
import { ClubService } from './club.service';
import { ClubRepository } from './club.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ClubRepository])],
  providers: [ClubService],
  controllers: [ClubController],
  exports: [ClubService],
})
export class LeagueModule {}
