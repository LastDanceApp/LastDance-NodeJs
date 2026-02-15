import { Injectable } from '@nestjs/common';
import { PrismaService } from '@app/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { CustomException } from '@app/common/exception/custom-exception';
import { UserErrorCode } from '@app/common/exception/user-error-code';
import { UserResponseDto } from './dto/user-response.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  async create(dto: CreateUserDto) {
    const hashed = await bcrypt.hash(dto.password, 10);

    try {
      return await this.prisma.user.create({
        data: {
          loginId: dto.loginId,
          password: hashed,
          name: dto.name,
        },
      });
    } catch (e: any) {
      if (e.code === 'P2002') {
        throw new CustomException(UserErrorCode.DUPLICATE_LOGIN_ID);
      }
      throw e;
    }
  }

  async getProfile(userId: number) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        loginId: true,
        name: true,
        createdAt: true,
      },
    });
    if (!user) {
      throw new CustomException(UserErrorCode.USER_NOT_FOUND);
    }
    const response: UserResponseDto = {
      userId: user.id,
      loginId: user.loginId,
      name: user.name,
    };

    return response;
  }
}
