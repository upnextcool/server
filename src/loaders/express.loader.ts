/**
 * Copyright (c) 2021, Ethan Elliott
 */

import * as Controllers from '@UpNext/controllers';
import { environment } from '@UpNext/environment';
import { Logger } from '@UpNext/logger';
import * as Middlewares from '@UpNext/middleware';
import { Application } from 'express';
import { MicroframeworkLoader, MicroframeworkSettings } from 'microframework';
import { createExpressServer } from 'routing-controllers';

export const ExpressLoader: MicroframeworkLoader = (settings: MicroframeworkSettings | undefined) => {
  const log = Logger.for(
    __filename, [ 'EXPRESS' ]
  );

  if (settings) {
    log.info('Loading Express');
    const expressApp: Application = createExpressServer({
      classTransformer: true,
      controllers: Object.values(Controllers),
      cors: true,
      defaultErrorHandler: false,
      middlewares: Object.values(Middlewares),
      routePrefix: `/${environment.api.route}`,
    });

    const server = settings.getData('http').createServer(expressApp);
    settings.setData(
      'server', server
    );
    settings.setData(
      'express_app', expressApp
    );
  }
};
