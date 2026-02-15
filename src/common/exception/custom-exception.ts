import { HttpException } from '@nestjs/common';
import { BaseCode } from './base-code';

export class CustomException extends HttpException {
  constructor(public readonly errorCode: BaseCode) {
    super(errorCode.message, errorCode.status);
  }
}
