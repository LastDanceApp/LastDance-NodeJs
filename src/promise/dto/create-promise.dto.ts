import {
  IsString,
  IsInt,
  Min,
  Max,
  MinLength,
  MaxLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PromiseCreateDto {
  @ApiProperty({
    example: '헬스장 가기',
    description: '약속 제목 (2~50자)',
    minLength: 2,
    maxLength: 50,
  })
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  title!: string;

  @ApiProperty({
    example: '주 3회 이상 출석하기',
    description: '약속 설명 (2~200자)',
    minLength: 2,
    maxLength: 200,
  })
  @IsString()
  @MinLength(2)
  @MaxLength(200)
  description!: string;

  @ApiProperty({
    example: 14,
    description: '약속 기간(일) (1~30)',
    minimum: 1,
    maximum: 30,
  })
  @IsInt()
  @Min(1)
  @Max(30)
  duration!: number;
}
