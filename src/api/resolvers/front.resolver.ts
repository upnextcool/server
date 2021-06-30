/**
 * Copyright (c) 2021, Ethan Elliott
 */

import { environment } from '@UpNext/environment';
import { FrontConfigOutput } from '@UpNext/resolvers/output';
import { Query, Resolver } from 'type-graphql';
import { Service } from 'typedi';

@Service()
@Resolver()
export class FrontResolver {
  
  @Query(() => FrontConfigOutput)
  async config(): Promise<FrontConfigOutput> {
    return {
      version: environment.front.version,
    };
  }
}
