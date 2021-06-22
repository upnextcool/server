/**
 * Copyright (c) 2021, Ethan Elliott
 */

import { Member, Party, PlaylistEntry, User, Vote } from '@UpNext/models';
import { MemberService } from '@UpNext/services';
import { FieldResolver, Query, Resolver, ResolverInterface, Root } from 'type-graphql';
import { Service } from 'typedi';

@Service()
@Resolver(() => Member)
export class MemberResolver implements ResolverInterface<Member>{

  constructor(private readonly _memberService: MemberService) {}

  @Query(() => [ Member ])
  async members(): Promise<Array<Member>> {
    return this._memberService.getAll();
  }

  @FieldResolver(() => User)
  async user (@Root() member: Member): Promise<User> {
    return this._memberService.getUserFor(member);
  }

  @FieldResolver(() => Party)
  async party (@Root() member: Member): Promise<Party> {
    return this._memberService.getPartyFor(member);
  }

  @FieldResolver(() => [ Vote ])
  async votes (@Root() member: Member): Promise<Array<Vote>> {
    return this._memberService.getVotesFor(member);
  }

  @FieldResolver(() => [ PlaylistEntry ])
  async playlistEntries (@Root() member: Member): Promise<Array<PlaylistEntry>> {
    return this._memberService.getPlaylistEntriesFor(member);
  }
}
