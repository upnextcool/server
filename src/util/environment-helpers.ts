/**
 * Copyright (c) 2021, Ethan Elliott
 */

export const EnvironmentHelpers = {
  getOsEnv(key: string): string {
    // eslint-disable-next-line security/detect-object-injection
    if (typeof process.env[key]==='undefined') {
      throw new TypeError(`Environment variable ${key} is not set.`);
    }
    // eslint-disable-next-line security/detect-object-injection
    return process.env[key] as string;
  },

  normalizePort(port: string): number {
    const parsedPort = Number.parseInt(
      port, 10
    );
    if (parsedPort >= 0) {
      return parsedPort;
    }
    return undefined;
  },

  toBoolean(value: string): boolean {
    return value==='true';
  },

  toNumber(value: string): number {
    return Number.parseInt(
      value, 10
    );
  },
};
