/**
 * Copyright (c) 2021, Ethan Elliott
 */

import { environment } from '@UpNext/environment';
import { Logger } from '@UpNext/logger';
import http from 'http';
import { MicroframeworkLoader, MicroframeworkSettings } from 'microframework';

export const HttpLoader: MicroframeworkLoader = (settings: MicroframeworkSettings | undefined) => {
  const log = Logger.for(
    __filename, [ 'HTTP' ]
  );

  if (settings) {
    log.info('Loading HTTP Instance');
    if (!environment.isTest) {
      settings.setData(
        'http', http
      );
    }
  }
};
