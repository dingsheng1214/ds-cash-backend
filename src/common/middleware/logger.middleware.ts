import { NextFunction, Request, Response } from 'express';
import { Logger } from '../utils/log4j';

export function LoggerMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const code = res.statusCode; // 响应状态码
  // 组装日志信息
  const logFormat = `
    Request original url: ${req.originalUrl}
    Method: ${req.method}
    IP: ${req.ip}
    Status code: ${code}
    Headers: ${JSON.stringify(req.headers)} \n
  `;
  next();
  // 根据状态码，进行日志类型区分
  if (code >= 500) {
    Logger.error(logFormat);
  } else if (code >= 400) {
    Logger.warn(logFormat);
  } else {
    Logger.access(logFormat);
    Logger.log(logFormat);
  }
}
