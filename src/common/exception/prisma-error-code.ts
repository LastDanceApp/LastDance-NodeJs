import { BaseCode } from './base-code';

export const PrismaErrorCode = {
  UNIQUE_CONSTRAINT: {
    code: 'PRISMA_409',
    message: '고유 제약 조건에 위배되었습니다.',
    status: 409,
  },

  RECORD_NOT_FOUND: {
    code: 'PRISMA_404',
    message: '요청한 레코드를 찾을 수 없습니다.',
    status: 404,
  },

  FOREIGN_KEY_CONSTRAINT: {
    code: 'PRISMA_409',
    message: '외래 키 제약 조건에 위배되었습니다.',
    status: 409,
  },

  NULL_CONSTRAINT: {
    code: 'PRISMA_400',
    message: 'NULL 제약 조건에 위배되었습니다.',
    status: 400,
  },

  UNKNOWN: {
    code: 'PRISMA_500',
    message: '데이터베이스 처리 중 오류가 발생했습니다.',
    status: 500,
  },
} satisfies Record<string, BaseCode>;
