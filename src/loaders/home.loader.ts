/**
 * Copyright (c) 2021, Ethan Elliott
 */

import { environment } from '@UpNext/environment';
import { Logger } from '@UpNext/logger';
import { Request, Response } from 'express';
import { MicroframeworkLoader, MicroframeworkSettings } from 'microframework';

export const HomeLoader: MicroframeworkLoader = (settings: MicroframeworkSettings | undefined) => {
  const log = Logger.for(
    __filename, [ 'HOME' ]
  );

  if (settings) {
    const url = `${environment.app.schema}://${environment.app.host}:${environment.app.port}`;
    log.info('Loading API Root');
    const expressApp = settings.getData('express_app');
    expressApp.get(
      '/',
      (
        request: Request, response: Response
      ) => response.json({
        description: environment.app.description,
        name: environment.app.name,
        urls: {
          api: `${url}/${environment.api.route}`,
          graphql: environment.graphql.enabled ? `${url}/${environment.graphql.route}`:undefined,
          swagger: environment.swagger.enabled ? `${url}/${environment.swagger.route}`:undefined,
        },
        version: environment.app.version,
      })
    );
    expressApp.get(
      `/${environment.api.route}`,
      (
        request: Request, response: Response
      ) => response.send('[API]')
    );
  }
};
