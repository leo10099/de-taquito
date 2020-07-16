import { IsString, IsNotEmpty, IsOptional, MaxLength, IsObject } from 'class-validator';
import { ClubExtServiceData } from '../club.entity';

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
}
