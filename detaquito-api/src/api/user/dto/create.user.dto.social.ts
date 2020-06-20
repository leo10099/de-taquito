import { IsString, IsNotEmpty, IsEmail, MaxLength } from 'class-validator';

export class CreateUserDtoSocialStrategy {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @MaxLength(50)
  fullName?: string;

  @IsNotEmpty()
  @IsString()
  googleId: string;

  @IsNotEmpty()
  @IsString()
  alias: string;
}
