import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus
} from '@nestjs/common';
import { FastifyReply, FastifyRequest } from 'fastify';
import { Logger } from 'src/common/utils/log4j';
import { BusinessException } from '../business.exceptions';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<FastifyReply>();
    const request = ctx.getRequest<FastifyRequest>();
    const status = exception.getStatus();

    const logFormat = `
    Request original url: ${request.url}
    Method: ${request.method}
    IP: ${request.ip}
    Response: ${JSON.stringify(exception.getResponse())} \n`;
    Logger.error(logFormat);

    if (exception instanceof BusinessException) {
      const error = exception.getResponse();
      response.status(HttpStatus.OK).send({
        data: null,
        status: error['code'],
        extra: {},
        message: error['message'],
        success: false
      });
      return;
    }

    response.status(status).send({
      status: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: exception.getResponse()
    });
  }
}
