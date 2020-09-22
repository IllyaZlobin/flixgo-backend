import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiBaseResponse } from '../../models';

@Injectable()
export class ToApiResponseInterceptor<T>
  implements NestInterceptor<T, ApiBaseResponse<T>> {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ApiBaseResponse<T>> {
    return next.handle().pipe(map(data => ({ errors: [], data })));
  }
}
