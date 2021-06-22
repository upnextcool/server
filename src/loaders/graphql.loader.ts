/**
 * Copyright (c) 2021, Ethan Elliott
 */
import { authChecker } from '@UpNext/auth/auth';
import { context } from '@UpNext/auth/context';
import { environment } from '@UpNext/environment';
import { Logger } from '@UpNext/logger';
import * as Resolvers from '@UpNext/resolvers';
import { ApolloServer } from 'apollo-server-express';
import { Express } from 'express';
import { execute, subscribe } from 'graphql';
import { MicroframeworkLoader, MicroframeworkSettings } from 'microframework';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { buildSchema } from 'type-graphql';
import { Container } from 'typedi';

export const GraphqlLoader: MicroframeworkLoader = async (settings: MicroframeworkSettings | undefined) => {
  const log = Logger.for(
    __filename, [ 'GRAPHQL' ]
  );
  if (settings && environment.graphql.enabled) {
    log.info('Starting graphql');
    const app: Express = settings.getData('express_app');
    const schema = await buildSchema({
      authChecker,
      container: Container,
      dateScalarMode: 'isoDate',
      resolvers: Object.values(Resolvers) as never
    });

    const apolloServer = new ApolloServer({
      context,
      introspection: !environment.isProduction,
      logger: log,
      playground: !environment.isProduction,
      plugins: [
        {
          requestDidStart: () => ({
            willSendResponse(requestContext) {
              Container.reset(requestContext.context.requestId);
            },
          }),
        },
      ],
      schema,
    });
    apolloServer.applyMiddleware({
      app,
      path: `/${environment.graphql.route}`,
    });

    const server = settings.getData('server');
    const ss = new SubscriptionServer(
      {
        execute,
        schema,
        subscribe,
      }, {
        path: `/${environment.graphql.route}`,
        server,
      }
    );
    log.info(ss.server.path);
  }
};
