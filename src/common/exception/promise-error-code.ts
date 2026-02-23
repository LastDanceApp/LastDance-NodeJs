import { HttpStatus } from '@nestjs/common';
import { BaseCode } from './base-code';

export const Promise_ErrorCode = {
  PROMISE_NOT_FOUND: {
    status: HttpStatus.NOT_FOUND,
    code: 'PROMISE_404',
    message: '약속을 찾을 수 없습니다.',
  },
} satisfies Record<string, BaseCode>;
