import { BaseCode } from './base-code';

export const CommonErrorCode = {
  BAD_REQUEST: {
    code: 'COMMON_400',
    message: '잘못된 요청입니다.',
    status: 400,
  },

  UNAUTHORIZED: {
    code: 'COMMON_401',
    message: '인증이 필요합니다.',
    status: 401,
  },

  FORBIDDEN: {
    code: 'COMMON_403',
    message: '접근 권한이 없습니다.',
    status: 403,
  },

  NOT_FOUND: {
    code: 'COMMON_404',
    message: '요청한 리소스를 찾을 수 없습니다.',
    status: 404,
  },

  METHOD_NOT_ALLOWED: {
    code: 'COMMON_405',
    message: '허용되지 않은 HTTP 메서드입니다.',
    status: 405,
  },

  CONFLICT: {
    code: 'COMMON_409',
    message: '요청이 현재 상태와 충돌합니다.',
    status: 409,
  },

  INTERNAL_SERVER_ERROR: {
    code: 'COMMON_500',
    message: '서버 내부 오류입니다.',
    status: 500,
  },
} satisfies Record<string, BaseCode>;
