/**
 * Copyright (c) 2021, Ethan Elliott
 */

import * as CronJobs from '@UpNext/jobs';
import { registerController } from 'cron-decorators';
import { MicroframeworkLoader, MicroframeworkSettings } from 'microframework';

import { Logger } from '../util/logger';

export const CronLoader: MicroframeworkLoader = (settings: MicroframeworkSettings | undefined) => {
  const log = new Logger(
    __filename, [ 'CRON' ]
  );
  if (settings) {
    log.info('Loading Cron jobs...');
    registerController(Object.values(CronJobs));
  }
};
