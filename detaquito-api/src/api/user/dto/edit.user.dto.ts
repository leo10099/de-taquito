import { IsString, IsEmail, IsOptional, MinLength, MaxLength } from 'class-validator';

import { Club } from '../../club/club.entity';

export class EditUserDto {
  @IsOptional()
  @IsString()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  @MinLength(6)
  @MaxLength(50)
  secret?: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  fullName?: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  alias?: string;

  @IsOptional()
  @IsString()
  club?: string | Club | null;

  @IsOptional()
  avatar?: any;
}
