/**
 * Copyright (c) 2021, Ethan Elliott
 */

import { environment } from '@UpNext/environment';
import { Logger } from '@UpNext/logger';
import { NextFunction, Request, Response } from 'express';
import { ExpressErrorMiddlewareInterface, HttpError, Middleware } from 'routing-controllers';

@Middleware({ type: 'after' })
export class ErrorMiddleware implements ExpressErrorMiddlewareInterface {
  private readonly log = Logger.for(__filename);

  error(
    error: HttpError, request: Request, response: Response, next: NextFunction
  ): void {
    const GENERIC_ERROR_CODE = 500;
    response.status(error.httpCode || GENERIC_ERROR_CODE);
    if (environment.isProduction) {
      response.json({
        name: error.name,
      });
    } else {
      response.json({
        message: error.message,
        name: error.name,
      });
    }

    this.log.error(error);
    next();
  }
}
