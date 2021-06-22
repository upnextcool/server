/**
 * Copyright (c) 2021, Ethan Elliott
 */

import dotenv from 'dotenv';
import { readFileSync } from 'fs';
import path from 'path';

import { description, name, version } from '../package.json';
import { EnvironmentHelpers } from './util/environment-helpers';

dotenv.config({ path: path.join(
  process.cwd(), `.env${process.env.NODE_ENV==='test' ? '.test':''}`
) });

export const environment = {
  api: {
    route: EnvironmentHelpers.getOsEnv('API_ROUTE'),
  },
  app: {
    description,
    host: EnvironmentHelpers.getOsEnv('APP_HOST'),
    key: readFileSync(EnvironmentHelpers.getOsEnv('APP_KEY')).toString(),
    name,
    port: EnvironmentHelpers.normalizePort(process.env.PORT || EnvironmentHelpers.getOsEnv('APP_PORT')),
    schema: EnvironmentHelpers.getOsEnv('APP_SCHEMA'),
    version,
  },
  database: {
    database: EnvironmentHelpers.getOsEnv('DATABASE_DATABASE'),
    host: EnvironmentHelpers.getOsEnv('DATABASE_HOST'),
    password: EnvironmentHelpers.getOsEnv('DATABASE_PASSWORD'),
    port: EnvironmentHelpers.toNumber(EnvironmentHelpers.getOsEnv('DATABASE_PORT')),
    type: EnvironmentHelpers.getOsEnv('DATABASE_TYPE'),
    username: EnvironmentHelpers.getOsEnv('DATABASE_USERNAME'),
  },
  front: {
    url: EnvironmentHelpers.getOsEnv('FRONT_URL'),
  },
  graphql: {
    enabled: EnvironmentHelpers.toBoolean(EnvironmentHelpers.getOsEnv('GRAPHQL_ENABLED')),
    route: EnvironmentHelpers.getOsEnv('GRAPHQL_ROUTE'),
  },
  isProduction: EnvironmentHelpers.getOsEnv('PRODUCTION')==='true',
  isTest: process.env.NODE_ENV==='test',
  logLevel: EnvironmentHelpers.getOsEnv('LOG_LEVEL'),
  node: process.env.NODE_ENV || 'development',
  spotify: {
    clientID: EnvironmentHelpers.getOsEnv('SPOTIFY_CLIENT_ID'),
    clientSecret: EnvironmentHelpers.getOsEnv('SPOTIFY_CLIENT_SECRET'),
    redirectURI: EnvironmentHelpers.getOsEnv('SPOTIFY_REDIRECT_URI'),
  },
  swagger: {
    enabled: EnvironmentHelpers.getOsEnv('SWAGGER_ENABLED'),
    route: EnvironmentHelpers.getOsEnv('SWAGGER_ROUTE'),
  },
};
