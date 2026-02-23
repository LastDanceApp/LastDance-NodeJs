import { Injectable } from '@nestjs/common';
import { PrismaService } from '@app/prisma/prisma.service';
import { CustomException } from '@app/common/exception/custom-exception';
import { PromiseCreateDto } from './dto/create-promise.dto';
import { UserErrorCode } from '@app/common/exception/user-error-code';
import { PromiseList } from './dto/promise-list.dto';
import { PromiseInfo } from './dto/promise-list.dto';
import { promiseStatus } from './promise.util';
import { lastDays } from './promise.util';
import { totalDays } from './promise.util';

@Injectable()
export class PromiseService {
  constructor(private prisma: PrismaService) {}

  async create(userId: number, dto: PromiseCreateDto) {
    // 날짜 계산
    const today = new Date();
    const end_date = new Date(today);
    today.setDate(today.getDate() + dto.duration);

    // 약속 생성
    try {
      return await this.prisma.promise.create({
        data: {
          userId: userId,
          createdAt: today,
          updatedAt: today,
          name: dto.title,
          description: dto.description,
          start_date: today,
          end_date: end_date,
        },
      });
    } catch (e: any) {
      if (e.code === 'P2002') {
        throw new CustomException(UserErrorCode.DUPLICATE_LOGIN_ID);
      }
      throw e;
    }
  }

  // 약속 목록
  async getPromiseList(userId: number): Promise<PromiseList> {
    const promises = await this.prisma.promise.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });

    const promiseInfos = promises.map((promise) => {
      return new PromiseInfo(
        promise.id,
        promise.name,
        promise.description,
        promiseStatus(promise.start_date, promise.end_date),
        lastDays(promise.start_date),
        totalDays(promise.start_date, promise.end_date),
        0, // TODO: witness 구현해야 함
      );
    });

    return new PromiseList(promiseInfos);
  }
}
