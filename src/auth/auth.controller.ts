import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from '@app/user/dto/login-user.dto';
import { ApiResponse } from '@app/common/response/api-response';
import { CommonSuccessCode } from '@app/common/exception/common-success-code';
import { Public } from '@app/common/decorators/public.decorator';
import {
  ApiBody,
  ApiOperation,
  ApiResponse as SwaggerApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('login')
  @ApiOperation({ summary: '로그인' })
  @ApiBody({ type: LoginUserDto })
  @SwaggerApiResponse({
    status: 200,
    description: '로그인 성공',
  })
  @SwaggerApiResponse({
    status: 401,
    description: '아이디 또는 비밀번호가 올바르지 않음',
  })
  async login(@Body() body: LoginUserDto) {
    const response = await this.authService.login(body);
    return ApiResponse.onSuccess(response, CommonSuccessCode.OK);
  }
}
