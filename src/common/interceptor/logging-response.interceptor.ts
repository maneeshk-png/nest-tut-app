import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
  } from '@nestjs/common';
  import { Observable } from 'rxjs';
  import { tap, map } from 'rxjs/operators';
  
  @Injectable()
  export class LoggingResponseInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
      const req = context.switchToHttp().getRequest();
      const method = req.method;
      const url = req.originalUrl;
      const now = Date.now();
  
      return next.handle().pipe(
        // Log execution time after controller finishes
        tap(() =>
          console.log(
            `⏱ [Interceptor] ${method} ${url} - ${Date.now() - now}ms`,
          ),
        ),
        // Transform response
        map((data) => ({
          status: 'success',
          data,
        })),
      );
    }
  }
  