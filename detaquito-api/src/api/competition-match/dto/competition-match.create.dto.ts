import { IsNotEmpty, IsOptional, IsObject, Max, IsNumber } from 'class-validator';

// Entities
import { CompetitionMatchweek } from 'src/api/competition-matchweek/competition-matchweek.entity';
import { CompetitionMatchExtServiceData } from '../competition-match.entity';

export class CreateCompetitionMatchDto {
  @IsNotEmpty()
  @IsNumber()
  @Max(100)
  public number: number;

  @IsOptional()
  @IsNotEmpty()
  @IsObject()
  extService?: CompetitionMatchExtServiceData;

  @IsNotEmpty()
  @IsNumber()
  matchweek: CompetitionMatchweek;
}
