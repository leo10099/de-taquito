import {
  IsNotEmpty,
  IsOptional,
  IsObject,
  Max,
  IsNumber,
  IsBoolean,
  IsArray,
} from 'class-validator';

// Entities
import { Competition } from '../../competition/competition.entity';
import { CompetitionMatch } from '../../competition-match/competition-match.entity';
import { CompetitionMatchweekExtServiceData } from '../competition-matchweek.entity';

export class CreateCompetitionMatchweekDto {
  @IsNotEmpty()
  @IsNumber()
  @Max(100)
  number: number;

  @IsOptional()
  @IsNotEmpty()
  @IsObject()
  extService?: CompetitionMatchweekExtServiceData;

  @IsNotEmpty()
  @IsNumber()
  competition: Competition;

  @IsOptional()
  @IsBoolean()
  isCurrent: boolean;

  @IsNotEmpty()
  @IsArray()
  matches: CompetitionMatch[];
}
