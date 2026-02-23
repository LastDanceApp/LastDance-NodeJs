// 여긴 약속 상수 모음입니다.

export const PromiseStatus = {
  SAFE: 'SAFE',
  WARNING: 'WARNING',
  CRITICAL: 'CRITICAL',
} as const;

export const PromiseStatusRate = {
  SAFE: 0.5,
  WARNING: 0.8,
} as const;

export type PromiseStatus = (typeof PromiseStatus)[keyof typeof PromiseStatus];
