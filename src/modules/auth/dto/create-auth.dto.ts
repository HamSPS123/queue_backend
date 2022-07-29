import { IsNotEmpty } from 'class-validator';

export class AuthDto {
  @IsNotEmpty()
  code: string;

  @IsNotEmpty()
  password: string;
}
