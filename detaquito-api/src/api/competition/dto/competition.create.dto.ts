import { IsString, IsNotEmpty, IsOptional, MaxLength, IsObject } from 'class-validator';
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

  @IsOptional()
  @IsNotEmpty()
  @IsObject()
  extService?: CompetitionExtServiceData;
}
