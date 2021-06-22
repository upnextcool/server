/**
 * Copyright (c) 2021, Ethan Elliott
 */

import { environment } from '@UpNext/environment';
import { Logger } from '@UpNext/logger';
import * as Models from '@UpNext/models';
import { MicroframeworkLoader, MicroframeworkSettings } from 'microframework';
import { ConnectionOptions, createConnection } from 'typeorm';

export const TypeOrmLoader: MicroframeworkLoader = async (settings: MicroframeworkSettings | undefined) => {
  const log = Logger.for(
    __filename, [ 'ORM' ]
  );

  log.info('Loading ORM');
  const options: ConnectionOptions = {
    database: environment.database.database,
    entities: Object.values(Models),
    host: environment.database.host,
    logging: [
      'schema',
      'error',
      'warn',
      'info',
      'log',
    ],
    password: environment.database.password,
    port: environment.database.port,
    ssl: { rejectUnauthorized: false },
    synchronize: true,
    type: environment.database.type as never,
    username: environment.database.username,
  };
  log.info('Connecting to DB');
  const connection = await createConnection(options);

  if (settings) {
    settings.setData(
      'connection', connection
    );
    settings.onShutdown(() => connection.close());
  }
};
