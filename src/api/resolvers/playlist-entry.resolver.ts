/**
 * Copyright (c) 2021, Ethan Elliott
 */

import { Member, Party, PlaylistEntry, Vote } from '@UpNext/models';
import { PlaylistEntryService } from '@UpNext/services';
import { FieldResolver, Query, Resolver, ResolverInterface, Root } from 'type-graphql';
import { Service } from 'typedi';

@Service()
@Resolver(() => PlaylistEntry)
export class PlaylistEntryResolver implements ResolverInterface<PlaylistEntry> {

  constructor(private readonly _playlistEntryService: PlaylistEntryService) {}

  @Query(() => [ PlaylistEntry ])
  async playlistEntries(): Promise<Array<PlaylistEntry>> {
    return this._playlistEntryService.getAll();
  }

  @FieldResolver(() => Member)
  async addedBy (@Root() playlistEntry: PlaylistEntry): Promise<Member> {
    return this._playlistEntryService.getAddedByFor(playlistEntry);
  }

  @FieldResolver(() => Party)
  async party (@Root() playlistEntry: PlaylistEntry): Promise<Party> {
    return this._playlistEntryService.getPartyFor(playlistEntry);
  }

  @FieldResolver(() => [ Vote ])
  async votes (@Root() playlistEntry: PlaylistEntry): Promise<Array<Vote>> {
    return this._playlistEntryService.getVotesFor(playlistEntry);
  }
}
