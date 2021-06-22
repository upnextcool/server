/**
 * Copyright (c) 2021, Ethan Elliott
 */

import chalk from 'chalk';
import path from 'path';
import winston from 'winston';

import { environment } from '../../environment';
import { LoggerInterface } from './logger-interface';

export class Logger implements LoggerInterface {
  static DEFAULT_SCOPE = 'app';

  private readonly scope: string;

  private readonly customDecorators: Array<string>;

  constructor(
    scope?: string, customDecorators?: Array<string>
  ) {
    // eslint-disable-next-line immutable/no-mutation
    this.scope = Logger.parsePathToScope(scope || Logger.DEFAULT_SCOPE);
    // eslint-disable-next-line immutable/no-mutation
    this.customDecorators = customDecorators || [];
  }

  static for(
    scope?: string, customDecorators?: Array<string>
  ): Logger {
    return new Logger(
      scope, customDecorators
    );
  }

  private static parsePathToScope(filepath: string): string {
    return filepath.replace(
      process.cwd(), ''
    )
      .replace(
        `${path.sep}src${path.sep}`, ''
      )
      .replace(
        `${path.sep}dist${path.sep}`, ''
      )
      .replace(
        '.ts', ''
      )
      .replace(
        '.js', ''
      )
      .split(path.sep).join(':').split('.')[0];
  }

  debug(...arguments_: Array<unknown>): void {
    this.log(
      'debug', arguments_
    );
  }

  info(...arguments_: Array<unknown>): void {
    this.log(
      'info', arguments_
    );
  }

  warn(...arguments_: Array<unknown>): void {
    this.log(
      'warn', arguments_
    );
  }

  error(...arguments_: Array<unknown>): void {
    this.log(
      'error', arguments_
    );
  }

  private log(
    level: string, message: Array<unknown>
  ): void {
    const messageParts = message.map(m => {
      if (m && typeof m!=='string') {
        if (m && m instanceof Error) {
          return environment.isProduction ? `${m.name}: ${m.message}`:`${m.name}: ${m.message}\n${m.stack}`;
        } else if (m.toString) {
          return m.toString();
        }
        return JSON.stringify(m);
      }
      return m;
    });
    // eslint-disable-next-line security/detect-object-injection
    winston[level](`${this.formatScope()}${this.formatCustomDecorators()} ${messageParts.join(' ')}`);
  }

  private formatCustomDecorators(): string {
    return this.customDecorators.map(d => `[${chalk.cyan(d)}]`).join('');
  }

  private formatScope(): string {
    return `[${chalk.blueBright(this.scope)}]`;
  }
}
