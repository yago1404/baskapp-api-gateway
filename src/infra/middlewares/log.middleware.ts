import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { LogUtil } from '../../application/utils/log.util';

@Injectable()
export class LogMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction): void {
    const { method, originalUrl, params, query, headers, body } = req;

    const requestParams: any = {
      endpoint: `${method} ${originalUrl}`,
      param: params,
      query: query,
      headers: headers,
      body: body,
    };

    const originalSend = res.send;
    res.send = function (body) {
      const responseParams: any = {
        statusCode: `${res.statusCode}`,
        responseBody: body,
      };

      LogUtil.logRequest(requestParams, responseParams);
      // eslint-disable-next-line prefer-rest-params
      return originalSend.apply(res, arguments);
    };

    next();
  }
}
