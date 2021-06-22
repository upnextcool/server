/**
 * Copyright (c) 2021, Ethan Elliott
 */

import { validateTokenAndGetState } from '@UpNext/auth/util';
import { Context } from '@UpNext/types';
import { ExpressContext } from 'apollo-server-express/src/ApolloServer';
import { Container } from 'typedi';
import { v4 } from 'uuid';

export const context = async (expressContext: ExpressContext): Promise<Context> => {
  const token = expressContext.req.headers.authorization;
  const { user, member, party } = await validateTokenAndGetState(token);
  const requestId = v4();
  const container = Container.of(requestId);
  const c: Context = {
    container,
    member,
    party,
    requestId,
    user,
  };
  container.set(
    'context', c
  );
  return c;
};
