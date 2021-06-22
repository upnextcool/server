/**
 * Copyright (c) 2021, Ethan Elliott
 */

import 'reflect-metadata';

import { Logger } from '@UpNext/logger';

import { UpNextServer } from './up-next.server';

const log = Logger.for('app');

UpNextServer
  .getInstance()
  .main()
  .catch(error => log.error(
    'SERVER HAS CRASHED!\n', error
  ));
