/**
 * Copyright (c) 2021, Ethan Elliott
 */

import { Logger } from '@UpNext/logger';
import chalk from 'chalk';
import { NextFunction, Request, Response } from 'express';
import { ExpressMiddlewareInterface, Middleware } from 'routing-controllers';

@Middleware({ type: 'before' })
export class LogMiddleware implements ExpressMiddlewareInterface {
  private readonly log = Logger.for(
    __filename, [ chalk.yellow('EXPRESS') ]
  );

  static colourizeHttpMethod(method: string): string {
    switch (method) {
    case 'GET':
      return chalk.blue(method);
    case 'POST':
      return chalk.green(method);
    case 'DELETE':
      return chalk.red(method);
    case 'PUT':
      return chalk.yellow(method);
    default:
      return method;
    }
  }

  use(
    request: Request, response: Response, next: NextFunction
  ): void {
    const method = LogMiddleware.colourizeHttpMethod(request.method);
    this.log.debug(`(${method}) ${request.path}`);
    next();
  }
}
