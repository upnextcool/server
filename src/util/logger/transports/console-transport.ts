/**
 * Copyright (c) 2021, Ethan Elliott
 */

import chalk from 'chalk';
import Transport from 'winston-transport';

export type LogLevel = 'error' | 'warn' | 'help' | 'info' | 'debug' | 'silly' | string;

export class ConsoleTransport extends Transport {
  // Until @Override becomes a thing
  static colourizeLevel(level: LogLevel): string {
    switch (level) {
    case 'error':
      return chalk.red(level);
    case 'warn':
      return chalk.redBright(level);
    case 'help':
      return chalk.cyan(level);
    case 'info':
      return chalk.green(level);
    case 'debug':
      return chalk.blue(level);
    case 'silly':
      return chalk.magenta(level);
    default:
      return level;
    }
  }

  // eslint-disable-next-line class-methods-use-this
  log(
    info: Record<string, string>, next: () => void
  ): void {
    // eslint-disable-next-line no-console
    console.log(`[${chalk.magenta(info.timestamp)}][${ConsoleTransport.colourizeLevel(info.level)}]${info.message}`);
    next();
  }
}
