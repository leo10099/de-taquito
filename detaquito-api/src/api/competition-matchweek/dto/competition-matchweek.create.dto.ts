import { IsNotEmpty, IsOptional, IsObject, Max, IsNumber } from 'class-validator';

// Entities
import { Competition } from 'src/api/competition/competition.entity';
import { CompetitionMatchweekExtServiceData } from '../competition-matchweek.entity';

export class CreateCompetitionMatchweekDto {
  @IsNotEmpty()
  @IsNumber()
  @Max(100)
  public number: number;

  @IsOptional()
  @IsNotEmpty()
  @IsObject()
  extService?: CompetitionMatchweekExtServiceData;

  @IsNotEmpty()
  @IsNumber()
  competition: Competition;
}
