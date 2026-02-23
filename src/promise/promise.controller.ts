import { User } from '@app/common/decorators/user.decorator';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiResponse } from '@app/common/response/api-response';
import { CommonSuccessCode } from '@app/common/exception/common-success-code';
import { PromiseService } from './promise.service';
import { PromiseCreateDto } from './dto/create-promise.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse as SwaggerApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Promise')
@Controller('promises')
export class PromiseController {
  constructor(private readonly promiseService: PromiseService) {}

  @Post()
  @ApiOperation({ summary: '약속 생성' })
  @ApiBearerAuth('access-token')
  @ApiBody({ type: PromiseCreateDto })
  @SwaggerApiResponse({
    status: 201,
    description: '약속 생성 성공',
  })
  @SwaggerApiResponse({
    status: 401,
    description: '인증 실패',
  })
  async create(@User('userId') userId: number, @Body() dto: PromiseCreateDto) {
    await this.promiseService.create(userId, dto);
    return ApiResponse.onSuccess(
      '회원가입 완료되었습니다',
      CommonSuccessCode.CREATED,
    );
  }
}
