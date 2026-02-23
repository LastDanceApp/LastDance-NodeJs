import { IsString, MinLength, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class InviteWitnessDto {
  @ApiProperty({
    example: 'friend_01',
    description: '초대할 사용자의 로그인 아이디 (2~20자)',
    minLength: 2,
    maxLength: 20,
  })
  @IsString()
  @MinLength(2)
  @MaxLength(20)
  loginId!: string;
}
