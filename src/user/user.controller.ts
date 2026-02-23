import { User } from '@app/common/decorators/user.decorator';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiResponse as CustomApiResponse } from '@app/common/response/api-response';
import { CommonSuccessCode } from '@app/common/exception/common-success-code';
import { Public } from '@app/common/decorators/public.decorator';

import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Post()
  @ApiOperation({ summary: '회원가입' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({
    status: 201,
    description: '회원가입 성공',
  })
  async create(@Body() dto: CreateUserDto) {
    await this.userService.create(dto);
    return CustomApiResponse.onSuccess(
      '회원가입 완료되었습니다',
      CommonSuccessCode.CREATED,
    );
  }

  @Get('profile')
  @ApiOperation({ summary: '내 프로필 조회' })
  @ApiBearerAuth('access-token')
  @ApiResponse({
    status: 200,
    description: '프로필 조회 성공',
  })
  @ApiResponse({
    status: 401,
    description: '인증 실패',
  })
  async getProfile(@User('userId') userId: number) {
    const response = await this.userService.getProfile(userId);
    return CustomApiResponse.onSuccess(response, CommonSuccessCode.OK);
  }
}
