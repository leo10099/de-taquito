import { IsString, IsNumber, IsNotEmpty, IsOptional, MaxLength, IsObject } from 'class-validator';
import { CompetitionExtServiceData } from '../competition.entity';

export class CreateCompetitionDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  name: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  country: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  logoUrl?: string;

  @IsNotEmpty()
  @IsNumber()
  matchesPerMatchweek?: number;

  @IsOptional()
  @IsNotEmpty()
  @IsObject()
  extService?: CompetitionExtServiceData;
}
