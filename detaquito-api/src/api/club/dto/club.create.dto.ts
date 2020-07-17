import { IsString, IsNotEmpty, IsOptional, MaxLength, IsObject, IsNumber } from 'class-validator';
import { ClubExtServiceData } from '../club.entity';
import { Competition } from 'src/api/competition/competition.entity';

export class CreateClubDto {
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
  extService?: ClubExtServiceData;

  @IsNotEmpty()
  @IsNumber()
  competition: Competition;
}
