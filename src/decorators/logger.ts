/**
 * Copyright (c) 2021, Ethan Elliott
 */

import { Logger } from '@UpNext/logger';
import { Container } from 'typedi';

export const LogInjector = (
  scope: string, customDecorator?: Array<string>
) =>
  (
    object: unknown, propertyName: string, index?: number
  ): void => {
    const logger = Logger.for(
      scope, customDecorator
    );
    Container.registerHandler({
      index, object, propertyName, value: () => logger,
    });
  };

export { LoggerInterface } from '../util/logger/logger-interface';
