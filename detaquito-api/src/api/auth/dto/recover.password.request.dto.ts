import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class RecoverPasswordRequestDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;
}
