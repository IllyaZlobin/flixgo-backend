import {
  ArgumentsHost,
  Catch,
  HttpServer,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { ValidationError, ApiBaseResponse } from '../../models';

import { UserFriendlyException, ValidationException } from '../exceptions';
import { NotFoundException } from '../exceptions/notFound.exception';

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
  constructor(
    applicationRef?: HttpServer,
  ) {
    super(applicationRef);
  }

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    if (exception instanceof UserFriendlyException) {
      const statusCode = exception.getStatus();
      const apiResponse = this.getApiResponse([
        { message: exception.message, property: [] },
      ]);

      response.status(statusCode).json(apiResponse);
      return;
    }

    if (exception instanceof ValidationException) {
      const statusCode = exception.getStatus();
      const apiResponse = this.getApiResponse(exception.errors);

      response.status(statusCode).json(apiResponse);
      return;
    }

    if (exception instanceof NotFoundException) {
      const statusCode = exception.getStatus();
      const apiResponse = this.getApiResponse([
        { message: exception.message, property: exception.property },
      ]);

      response.status(statusCode).json(apiResponse);
      return;
    }

    if (exception instanceof HttpException) {
      const statusCode = exception.getStatus();
      const apiResponse = this.getApiResponse([
        { message: exception.message, property: [] },
      ]);
      response.status(statusCode).json(apiResponse);
      return;
    }

    if (this.isHttpException(exception)) {
      const statusCode = exception.getStatus();
      const apiResponse = this.getApiResponse([
        { message: exception.message, property: [] },
      ]);
      response.status(statusCode).json(apiResponse);
      return;
    }

    /*
    if (this.logger && (!ENV.IS_LOCAL || this.logLocalExceptions)) {
      const requestInfo: LoggerRequestInfo = {
        host: request.hostname,
        method: request.method,
        protocol: request.protocol,
        url: request.originalUrl,
        body: request.body ? JSON.stringify(request.body) : null,
      };

      this.logger.error(exception, requestInfo);
    }

    if (super.isExceptionObject(exception)) {
      const apiResponse = this.getApiResponse([
        { message: exception.message, property: [] },
      ]);
      response.status(HttpStatus.INTERNAL_SERVER_ERROR).json(apiResponse);
      return;
    }*/

    const apiResponse = this.getApiResponse([
      { message: 'Unknown error', property: [] },
    ]);
    response.status(HttpStatus.INTERNAL_SERVER_ERROR).json(apiResponse);
  }

  private getApiResponse(errors: ValidationError[]): ApiBaseResponse<null> {
    return {
      data: null,
      errors,
    };
  }

  private isHttpException(exception: unknown): exception is HttpException {
    const e = exception as HttpException;
    return e.getStatus !== undefined && e.message !== undefined;
  }
}
