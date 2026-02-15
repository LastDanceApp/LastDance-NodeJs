import {
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiResponse } from '../response/api-response';
import { CommonSuccessCode } from '../exception/common-success-code';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(
    _context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        if (data instanceof ApiResponse) {
          return data;
        }
        return ApiResponse.onSuccess(data, CommonSuccessCode.OK);
      }),
    );
  }
}
