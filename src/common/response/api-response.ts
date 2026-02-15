import { BaseCode } from '../exception/base-code';

export class ApiResponse<T> {
  constructor(
    public readonly isSuccess: boolean,
    public readonly code: string,
    public readonly message: string,
    public readonly result?: T,
  ) {}

  static onSuccess<T>(result: T, baseCode: BaseCode): ApiResponse<T> {
    return new ApiResponse(true, baseCode.code, baseCode.message, result);
  }

  static onFail(baseCode: BaseCode): ApiResponse<null> {
    return new ApiResponse(false, baseCode.code, baseCode.message, null);
  }
}
