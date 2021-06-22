/**
 * Copyright (c) 2021, Ethan Elliott
 */

import { environment } from '@UpNext/environment';
import { Logger } from '@UpNext/logger';
import { validationMetadatasToSchemas } from 'class-validator-jsonschema';
import { MicroframeworkLoader, MicroframeworkSettings } from 'microframework';
import { getMetadataArgsStorage } from 'routing-controllers';
import { routingControllersToSpec } from 'routing-controllers-openapi';
import * as swaggerUi from 'swagger-ui-express';

export const SwaggerLoader: MicroframeworkLoader = (settings: MicroframeworkSettings | undefined) => {
  const log = Logger.for(
    __filename, [ 'SWAGGER' ]
  );
  const DEFAULT_PUBLIC_PORT = 80;
  const port = environment.app.port===DEFAULT_PUBLIC_PORT ? '':`:${environment.app.port}`;
  const url = `${environment.app.schema}://${environment.app.host}${port}`;

  if (settings && environment.swagger.enabled) {
    log.info('Loading Swagger');
    const expressApp = settings.getData('express_app');
    const schemas = validationMetadatasToSchemas();
    const swaggerFile = routingControllersToSpec(
      getMetadataArgsStorage(),
      {},
      {
        components: {
          schemas,
        },
        info: {
          description: environment.app.description,
          name: environment.app.name,
          title: environment.app.name,
          version: environment.app.version,
        },
        servers: [
          {
            url: `${url}/${environment.api.route}`,
          },
        ],
      },
    );
    expressApp.use(
      `/${environment.swagger.route}`,
      (
        request, response, next
      ) => next(),
      swaggerUi.serve,
      swaggerUi.setup(swaggerFile),
    );
  }
};
