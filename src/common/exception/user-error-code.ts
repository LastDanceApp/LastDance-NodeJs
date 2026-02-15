import { HttpStatus } from '@nestjs/common';
import { BaseCode } from './base-code';

export const UserErrorCode = {
  USER_NOT_FOUND: {
    status: HttpStatus.NOT_FOUND,
    code: 'USER_404',
    message: '사용자를 찾을 수 없습니다.',
  },

  DUPLICATE_LOGIN_ID: {
    status: HttpStatus.CONFLICT,
    code: 'USER_409',
    message: '이미 사용 중인 아이디입니다.',
  },

  INVALID_PASSWORD: {
    status: HttpStatus.UNAUTHORIZED,
    code: 'USER_401',
    message: '비밀번호가 올바르지 않습니다.',
  },

  DELETED_USER: {
    status: HttpStatus.FORBIDDEN,
    code: 'USER_403',
    message: '탈퇴한 사용자입니다.',
  },
} satisfies Record<string, BaseCode>;
