/**
 * Copyright (c) 2021, Ethan Elliott
 */

import { environment } from '@UpNext/environment';
import { ConsoleTransport } from '@UpNext/logger';
import { Format, TransformableInfo } from 'logform';
import { MicroframeworkLoader } from 'microframework';
import { configure, format, transports } from 'winston';

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

  const fileLogFormat = (): Format => combine(
    timestamp(), developmentFormat()
  );

  configure({
    exceptionHandlers: [
      new transports.File({
        filename: 'exceptions.log',
      }),
    ],
    exitOnError: false,
    level: environment.logLevel,
    transports: [
      new transports.File({ filename: 'combined.log', format: fileLogFormat() }),
      new ConsoleTransport({ format: consoleLogFormat() }),
    ],
  });
};
