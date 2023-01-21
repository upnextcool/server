/**
 * Copyright (c) 2021, Ethan Elliott
 */

import { environment } from '@UpNext/environment';
import { ConsoleTransport } from '@UpNext/logger';
import { Format, TransformableInfo } from 'logform';
import { MicroframeworkLoader } from 'microframework';
import { configure, format } from 'winston';

const formatMessage = (info: { timestamp: unknown; level: unknown; message: unknown; durationMs: unknown; }) =>
  `[${info.timestamp}] [${info.level}] ${info.message} ${info.durationMs ? `Timer: ${info.durationMs}ms`:''}`;
const formatError = (info: { timestamp: unknown; level: unknown; message: unknown; durationMs: unknown; }) =>
  `[${info.timestamp}] [${info.level}] ${info.message}`;
const selectFormat = (info: { timestamp: unknown; level: unknown; message: unknown; durationMs: unknown; }) =>
  info instanceof Error ? formatError(info):formatMessage(info);

export const LoggerLoader: MicroframeworkLoader = () => {
  const {
    combine, timestamp, printf,
  } = format;


  const developmentFormat = () => printf(selectFormat as (info: TransformableInfo) => string);

  const consoleLogFormat = (): Format => combine(
    timestamp(), developmentFormat()
  );

  configure({
    exitOnError: false,
    level: environment.logLevel,
    transports: [ new ConsoleTransport({ format: consoleLogFormat() }) ],
  });
};
