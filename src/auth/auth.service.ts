import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CustomException } from '@app/common/exception/custom-exception';
import { UserErrorCode } from '@app/common/exception/user-error-code';
import { LoginUserDto } from '../user/dto/login-user.dto';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { LoginResponseDto } from './login-response-dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async login(dto: LoginUserDto) {
    const user = await this.prisma.user.findUnique({
      where: { loginId: dto.loginId },
      select: {
        id: true,
        loginId: true,
        name: true,
        password: true,
      },
    });

    if (!user) {
      throw new CustomException(UserErrorCode.USER_NOT_FOUND);
    }

    const isMatch = await bcrypt.compare(dto.password, user.password);

    if (!isMatch) {
      throw new CustomException(UserErrorCode.INVALID_PASSWORD);
    }

    // jwt 발급
    const payload = {
      sub: user.id,
      loginId: user.loginId,
    };
    // access token 발급
    const accessToken = await this.jwtService.signAsync(payload);

    const response: LoginResponseDto = {
      userId: user.id,
      loginId: user.loginId,
      name: user.name,
      accessToken,
    };

    return response;
  }
}
