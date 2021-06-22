/**
 * Copyright (c) 2021, Ethan Elliott
 */

import { Member, PlaylistEntry, Vote } from '@UpNext/models';
import { VoteService } from '@UpNext/services';
import { FieldResolver, Resolver, ResolverInterface, Root } from 'type-graphql';
import { Service } from 'typedi';

@Service()
@Resolver(() => Vote)
export class VoteResolver implements ResolverInterface<Vote> {

  constructor(private readonly _voteService: VoteService) {}

  @FieldResolver(() => Member)
  async member (@Root() vote: Vote): Promise<Member> {
    return this._voteService.getMemberFor(vote);
  }

  @FieldResolver(() => PlaylistEntry)
  async playlistEntry (@Root() vote: Vote): Promise<PlaylistEntry> {
    return this._voteService.getPlaylistEntryFor(vote);
  }
}
