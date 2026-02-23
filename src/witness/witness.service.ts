import { Injectable } from '@nestjs/common';
import { CustomException } from '@app/common/exception/custom-exception';
import { PrismaService } from '@app/prisma/prisma.service';
import { InviteWitnessDto } from './dto/witness-invite.dto';
import { UserErrorCode } from '@app/common/exception/user-error-code';
import { WitnessErrorCode } from '@app/common/exception/witness-error-code';

@Injectable()
export class WitnessService {
  constructor(private prisma: PrismaService) {}

  async invite(userId: number, dto: InviteWitnessDto, promiseId: number) {
    // 약속 소유자 검증
    const promiseCount = await this.prisma.promise.count({
      where: {
        userId: userId,
        id: promiseId,
      },
    });

    if (promiseCount < 0) {
      // TODO : promise 예외처리
      throw new CustomException(UserErrorCode.USER_NOT_FOUND);
    }

    const user = await this.prisma.user.findUnique({
      where: {
        loginId: dto.loginId,
      },
      select: {
        id: true,
      },
    });

    if (!user) {
      throw new CustomException(UserErrorCode.USER_NOT_FOUND);
    }

    const count = await this.prisma.promiseLooking.count({
      where: {
        userId: user.id,
        promiseId: promiseId,
      },
    });

    if (count > 0) {
      throw new CustomException(WitnessErrorCode.DUPLICATE_WITNESS);
    }
    try {
      await this.prisma.promiseLooking.create({
        data: {
          userId: user.id,
          promiseId: promiseId,
        },
      });
    } catch (e: any) {
      if (e.code === 'P2002') {
        throw new CustomException(WitnessErrorCode.DUPLICATE_WITNESS);
      }
      throw e;
    }
  }

  // 초대 삭제
  async cancelInvite(userId: number, promiseId: number, targetId: number) {
    // 약속 소유자 검증
    const promiseCount = await this.prisma.promise.count({
      where: {
        userId: userId,
        id: promiseId,
      },
    });

    if (promiseCount < 0) {
      // TODO : promise 예외처리
      throw new CustomException(UserErrorCode.USER_NOT_FOUND);
    }

    await this.prisma.promiseLooking.delete({
      where: {
        userId_promiseId: {
          userId: targetId,
          promiseId: promiseId,
        },
      },
    });
  }

  // 증인 목록 조회
}
