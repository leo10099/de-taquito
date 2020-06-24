import { IsString, MaxLength, MinLength, IsNotEmpty } from 'class-validator';

export class ReplaceForgottenPasswordtDto {
  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @MaxLength(50)
  secret: string;
}
