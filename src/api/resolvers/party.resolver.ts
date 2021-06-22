/**
 * Copyright (c) 2021, Ethan Elliott
 */

import { Member, Party, PlaylistEntry } from '@UpNext/models';
import { PartyService } from '@UpNext/services';
import { Arg, FieldResolver, Mutation, Query, Resolver, ResolverInterface, Root } from 'type-graphql';
import { Service } from 'typedi';

@Service()
@Resolver(() => Party)
export class PartyResolver implements ResolverInterface<Party>{

  constructor(private readonly _partyService: PartyService) {}

  @Query(() => Party)
  async partyById(@Arg('id') id: string): Promise<Party> {
    return this._partyService.getById(id);
  }

  @Query(() => Party)
  async partyByCode(@Arg('code') code: string): Promise<Party> {
    return this._partyService.getByCode(code);
  }

  @FieldResolver(() => [ Member ])
  async members (@Root() party: Party): Promise<Array<Member>> {
    return this._partyService.getMembersFor(party);
  }
  
  @FieldResolver(() => [ PlaylistEntry ])
  async playlist(@Root() party: Party): Promise<Array<PlaylistEntry>> {
    return this._partyService.getPlaylistFor(party);
  }

  @Mutation(() => Party)
  async startParty(@Arg('partyName') partyName: string): Promise<Party> {
    return this._partyService.createParty(partyName);
  }
}
