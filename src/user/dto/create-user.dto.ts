import { IsString, MinLength, MaxLength, Matches } from 'class-validator';

export class CreateUserDto {
  @Matches(/^[a-zA-Z0-9_]+$/)
  @IsString()
  @MinLength(6)
  @MaxLength(20)
  loginId!: string;

  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,20}$/)
  @IsString()
  @MinLength(6)
  @MaxLength(20)
  password!: string;

  @IsString()
  @MinLength(2)
  @MaxLength(20)
  name!: string;
}
