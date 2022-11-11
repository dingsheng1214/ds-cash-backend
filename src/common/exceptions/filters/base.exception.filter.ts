import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
  ServiceUnavailableException,
} from '@nestjs/common';
import { FastifyReply, FastifyRequest } from 'fastify';
import { Logger } from 'src/common/utils/log4j';

@Catch()
export class BaseExceptionFilter<T> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<FastifyReply>();
    const request = ctx.getRequest<FastifyRequest>();

    Logger.error(exception);

    // 非 HTTP 标准异常的处理。
    response.status(HttpStatus.SERVICE_UNAVAILABLE).send({
      status: HttpStatus.SERVICE_UNAVAILABLE,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: new ServiceUnavailableException().getResponse(),
    });
  }
}
