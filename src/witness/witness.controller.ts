import { User } from '@app/common/decorators/user.decorator';
import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { WitnessService } from './witness.service';
import { InviteWitnessDto } from './dto/witness-invite.dto';
import { ApiResponse } from '@app/common/response/api-response';
import { CommonSuccessCode } from '@app/common/exception/common-success-code';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse as SwaggerApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Witness')
@Controller('witnesses')
export class WitnessController {
  constructor(private readonly witnessService: WitnessService) {}

  @Post(':promiseId/invite')
  @ApiOperation({ summary: '증인 초대' })
  @ApiBearerAuth('access-token')
  @ApiParam({
    name: 'promiseId',
    type: Number,
    description: '약속 ID',
    example: 1,
  })
  @ApiBody({ type: InviteWitnessDto })
  @SwaggerApiResponse({
    status: 201,
    description: '초대 성공',
  })
  @SwaggerApiResponse({
    status: 401,
    description: '인증 실패',
  })
  async invite(
    @User('userId') userId: number,
    @Param('promiseId') promiseId: number,
    @Body() dto: InviteWitnessDto,
  ) {
    await this.witnessService.invite(userId, dto, promiseId);
    return ApiResponse.onSuccess(
      '초대 완료되었습니다.',
      CommonSuccessCode.CREATED,
    );
  }

  @Delete(':promiseId/delete/:targetId')
  @ApiOperation({ summary: '증인 초대 취소' })
  @ApiBearerAuth('access-token')
  @ApiParam({
    name: 'promiseId',
    type: Number,
    description: '약속 ID',
    example: 1,
  })
  @ApiParam({
    name: 'targetId',
    type: Number,
    description: '초대 취소 대상 사용자 ID',
    example: 2,
  })
  @SwaggerApiResponse({
    status: 200,
    description: '초대 취소 성공',
  })
  @SwaggerApiResponse({
    status: 401,
    description: '인증 실패',
  })
  async inviteCancel(
    @User('userId') userId: number,
    @Param('promiseId') promiseId: number,
    @Param('targetId') targetId: number,
  ) {
    await this.witnessService.cancelInvite(userId, promiseId, targetId);
    return ApiResponse.onSuccess(
      '초대가 취소되었습니다.',
      CommonSuccessCode.OK,
    );
  }
}
