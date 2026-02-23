import { IsString, MinLength, MaxLength, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    example: 'test_user1',
    description: '로그인 아이디 (영문, 숫자, 언더스코어만 허용 / 6~20자)',
    minLength: 6,
    maxLength: 20,
  })
  @Matches(/^[a-zA-Z0-9_]+$/, {
    message: '아이디는 영문, 숫자, 언더스코어만 가능합니다.',
  })
  @IsString()
  @MinLength(6)
  @MaxLength(20)
  loginId!: string;

  @ApiProperty({
    example: 'abc1234',
    description: '비밀번호 (영문 + 숫자 조합 필수 / 6~20자)',
    minLength: 6,
    maxLength: 20,
  })
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,20}$/, {
    message: '비밀번호는 영문과 숫자를 포함해야 합니다.',
  })
  @IsString()
  @MinLength(6)
  @MaxLength(20)
  password!: string;

  @ApiProperty({
    example: '지원',
    description: '사용자 이름 (2~20자)',
    minLength: 2,
    maxLength: 20,
  })
  @IsString()
  @MinLength(2)
  @MaxLength(20)
  name!: string;
}
