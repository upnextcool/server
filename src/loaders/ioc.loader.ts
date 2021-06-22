/**
 * Copyright (c) 2021, Ethan Elliott
 */

import { Logger } from '@UpNext/logger';
import { useContainer as classValidatorUseContainer } from 'class-validator';
import { useContainer as cronUseContainer } from 'cron-decorators';
import { MicroframeworkLoader } from 'microframework';
import { useContainer as routingUseContainer } from 'routing-controllers';
import { Container } from 'typedi';
import { useContainer as ormUseContainer } from 'typeorm';


export const IocLoader: MicroframeworkLoader = () => {
  const log = Logger.for(
    __filename, [ 'IOC' ]
  );
  log.info('Loading Containers');
  routingUseContainer(Container);
  ormUseContainer(Container);
  cronUseContainer(Container);
  classValidatorUseContainer(Container);
};
