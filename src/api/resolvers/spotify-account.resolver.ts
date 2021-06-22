/**
 * Copyright (c) 2021, Ethan Elliott
 */

import { Party, SpotifyAccount } from '@UpNext/models';
import { SpotifyAccountService } from '@UpNext/services';
import { FieldResolver, Query, Resolver, ResolverInterface, Root } from 'type-graphql';
import { Service } from 'typedi';

@Service()
@Resolver(() => SpotifyAccount)
export class SpotifyAccountResolver implements ResolverInterface<SpotifyAccount> {

  constructor(private readonly _spotifyAccountService: SpotifyAccountService) {}

  @Query(() => [ SpotifyAccount ])
  async spotifyAccounts(): Promise<Array<SpotifyAccount>> {
    return this._spotifyAccountService.getAll();
  }

  @FieldResolver(() => Party)
  async party (@Root() spotifyAccount: SpotifyAccount): Promise<Party> {
    return this._spotifyAccountService.getPartyFor(spotifyAccount);
  }
}
