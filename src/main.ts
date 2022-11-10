import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { BaseExceptionFilter } from './common/exceptions/filters/base.exception.filter';
import { HttpExceptionFilter } from './common/exceptions/filters/http.exception.filter';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { Logger } from './common/utils/log4j';
import { generateSwaggerDocument } from './common/utils/swagger';
declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter()
  );

  // 中间件-日志
  app.use(LoggerMiddleware);
  // 拦截器-封装统一返回
  app.useGlobalInterceptors(new TransformInterceptor());
  // 过滤器-异常处理
  app.useGlobalFilters(new BaseExceptionFilter(), new HttpExceptionFilter());
  // HRM 热更新
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
  // 生成 swagger 文档
  generateSwaggerDocument(app);

  await app.listen(3000);
  Logger.msg(`Application is running on: ${await app.getUrl()}`);
  Logger.msg(`Swagger is running on: ${await app.getUrl()}/api`);
  Logger.msg(`Current NODE_ENV: ${process.env.NODE_ENV}`);
}

bootstrap();
