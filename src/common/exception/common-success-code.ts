import { HttpStatus } from '@nestjs/common';
import { BaseCode } from './base-code';

export const CommonSuccessCode = {
  OK: {
    status: HttpStatus.OK,
    code: 'COMMON_200',
    message: '요청 성공',
  },

  CREATED: {
    status: HttpStatus.CREATED,
    code: 'COMMON_201',
    message: '생성 성공',
  },
} satisfies Record<string, BaseCode>;
