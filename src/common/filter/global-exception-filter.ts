import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';
import { ApiResponse } from '../response/api-response';
import { CustomException } from '../exception/custom-exception';
import { CommonErrorCode } from '../exception/common-error-code';
import { PrismaErrorCode } from '../exception/prisma-error-code';
import {
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
} from '@prisma/client/runtime/library.js';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let errorCode = CommonErrorCode.INTERNAL_SERVER_ERROR;

    if (exception instanceof CustomException) {
      errorCode = exception.errorCode;
    } else if (exception instanceof PrismaClientKnownRequestError) {
      switch (exception.code) {
        case 'P2002':
          errorCode = PrismaErrorCode.UNIQUE_CONSTRAINT;
          break;
        case 'P2025':
          errorCode = PrismaErrorCode.RECORD_NOT_FOUND;
          break;
        case 'P2003':
          errorCode = PrismaErrorCode.FOREIGN_KEY_CONSTRAINT;
          break;
        case 'P2011':
          errorCode = PrismaErrorCode.NULL_CONSTRAINT;
          break;
        default:
          errorCode = PrismaErrorCode.UNKNOWN;
      }
    } else if (exception instanceof PrismaClientUnknownRequestError) {
      errorCode = PrismaErrorCode.UNKNOWN;
    } else if (exception instanceof HttpException) {
      const status = exception.getStatus();
      errorCode = {
        code: `COMMON_${status}`,
        message: exception.message,
        status,
      };
    } else {
      console.error('Unhandled Error:', exception);
    }

    return response
      .status(errorCode.status)
      .json(ApiResponse.onFail(errorCode));
  }
}
