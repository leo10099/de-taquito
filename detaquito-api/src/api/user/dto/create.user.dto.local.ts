import { IsString, IsNotEmpty, IsEmail, IsOptional, MinLength, MaxLength } from 'class-validator';

export class CreateUserDtoLocalStrategy {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @MaxLength(50)
  secret: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  alias?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  favTeam?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  salt?: string;
}
