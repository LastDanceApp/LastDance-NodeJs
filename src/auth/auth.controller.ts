import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from '@app/user/dto/login-user.dto';
import { ApiResponse } from '@app/common/response/api-response';
import { CommonSuccessCode } from '@app/common/exception/common-success-code';
import { Public } from '@app/common/decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('login')
  async login(@Body() body: LoginUserDto) {
    const response = await this.authService.login(body);
    return ApiResponse.onSuccess(response, CommonSuccessCode.OK);
  }
}
