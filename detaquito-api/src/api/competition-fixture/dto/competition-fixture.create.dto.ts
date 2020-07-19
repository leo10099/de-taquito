import {
  IsString,
  IsNotEmpty,
  IsOptional,
  MaxLength,
  IsObject,
  Max,
  IsNumber,
} from 'class-validator';

// Entities
import { Competition } from 'src/api/competition/competition.entity';
import { CompetitionFixtureExtServiceData } from '../competition-fixture.entity';

export class CreateCompetitionFixtureDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  name: string;

  @IsNotEmpty()
  @IsNumber()
  @Max(100)
  public number: number;

  @IsOptional()
  @IsNotEmpty()
  @IsObject()
  extService?: CompetitionFixtureExtServiceData;

  @IsNotEmpty()
  @IsNumber()
  competition: Competition;
}
