import { User } from '@app/common/decorators/user.decorator';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiResponse } from '@app/common/response/api-response';
import { CommonSuccessCode } from '@app/common/exception/common-success-code';
import { Public } from '@app/common/decorators/public.decorator';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Post()
  async create(@Body() dto: CreateUserDto) {
    await this.userService.create(dto);
    return ApiResponse.onSuccess(
      '회원가입 완료되었습니다',
      CommonSuccessCode.CREATED,
    );
  }

  @Get('profile')
  async getProfile(@User('userId') userId: number) {
    const response = await this.userService.getProfile(userId);
    return ApiResponse.onSuccess(response, CommonSuccessCode.OK);
  }
}
