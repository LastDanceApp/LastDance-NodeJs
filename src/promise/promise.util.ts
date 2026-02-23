import { PromiseStatus, PromiseStatusRate } from './promise.const';
import type { PromiseStatus as PromiseStatusType } from './promise.const';

// 약속 상태 계산해서 PromiseStatusType 형태로 반환하는 함수
export function promiseStatus(
  startDate: Date,
  endDate: Date,
): PromiseStatusType {
  const today = new Date();
  const total = endDate.getTime() - startDate.getTime();
  const elapsed = today.getTime() - startDate.getTime();

  if (today.getTime() >= endDate.getTime()) {
    return PromiseStatus.CRITICAL;
  }

  if (total <= 0) {
    return PromiseStatus.CRITICAL;
  }

  const progress = elapsed / total;

  if (progress < PromiseStatusRate.SAFE) {
    return PromiseStatus.SAFE;
  }

  if (progress < PromiseStatusRate.WARNING) {
    return PromiseStatus.WARNING;
  }

  return PromiseStatus.CRITICAL;
}

// 약속 시작일부터 오늘까지의 일 수를 계산하는 함수
export function lastDays(start_date: Date): number {
  const today = new Date();
  const total = today.getTime() - start_date.getTime();
  const days = Math.ceil(total / (1000 * 60 * 60 * 24));
  return days;
}

// 총 일수를 반환합니다
export function totalDays(start_date: Date, end_date: Date): number {
  const total = end_date.getTime() - start_date.getTime();
  const days = Math.ceil(total / (1000 * 60 * 60 * 24));
  return days;
}
