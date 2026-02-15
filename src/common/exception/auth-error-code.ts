import { BaseCode } from './base-code';

export const AuthErrorCode = {
  // 401
  TOKEN_MISSING: {
    code: 'AUTH_401',
    message: '토큰이 존재하지 않습니다.',
    status: 401,
  },

  TOKEN_INVALID: {
    code: 'AUTH_401',
    message: '유효하지 않은 토큰입니다.',
    status: 401,
  },

  TOKEN_EXPIRED: {
    code: 'AUTH_401',
    message: '토큰이 만료되었습니다.',
    status: 401,
  },

  INSUFFICIENT_PERMISSION: {
    code: 'AUTH_403',
    message: '해당 작업에 대한 권한이 없습니다.',
    status: 403,
  },
} satisfies Record<string, BaseCode>;
