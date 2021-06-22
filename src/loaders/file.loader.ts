/**
 * Copyright (c) 2021, Ethan Elliott
 */

import { Logger } from '@UpNext/logger';
import { static as expressStatic } from 'express';
import { MicroframeworkLoader, MicroframeworkSettings } from 'microframework';
import path from 'path';

export const FileLoader: MicroframeworkLoader = (settings: MicroframeworkSettings | undefined) => {
  const log = Logger.for(
    __filename, [ 'FILE' ]
  );

  if (settings) {
    log.info('Loading Public Dir');
    const expressApp = settings.getData('express_app');
    expressApp.use(expressStatic(
      path.join(
        __dirname, '..', 'public'
      ), { maxAge: 31_557_600_000 }
    ));
  }
};
