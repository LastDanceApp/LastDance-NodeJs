import { HttpStatus } from '@nestjs/common';
import { BaseCode } from './base-code';

export const WitnessErrorCode = {
  WITNESS_NOT_FOUND: {
    status: HttpStatus.NOT_FOUND,
    code: 'WITNESS_404',
    message: '증인을 찾을 수 없습니다.',
  },

  DUPLICATE_WITNESS: {
    status: HttpStatus.CONFLICT,
    code: 'WITNESS_409',
    message: '이미 증인으로 등록되어 있는 사용자입니다.',
  },
} satisfies Record<string, BaseCode>;
