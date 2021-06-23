/**
 * Copyright (c) 2021, Ethan Elliott
 */

import { Party, PlaylistEntry, PlaylistHistory } from '@UpNext/models';
import { PartyStateOutput } from '@UpNext/resolvers/output';
import { AuthService, FullArtist, PartyService, UpNextService } from '@UpNext/services';
import { Album, FeaturedPlaylists, Playlist as PlaylistObject, SearchResultAll } from '@UpNext/spotify';
import { Context } from '@UpNext/types';
import GraphQLJSON from 'graphql-type-json';
import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import { Service } from 'typedi';

@Service()
@Resolver()
export class UpNextResolver {

  constructor(
    private readonly _upNextService: UpNextService,
    private readonly _authService: AuthService,
    private readonly _partyService: PartyService,
  ) {}


  @Mutation(() => String)
  async startAuth(
    @Arg('userId') userId: string,
    @Arg('partyId') partyId: string
  ): Promise<string> {
    return this._authService.startAuthGetRedirectUrl(
      userId,
      partyId
    );
  }

  @Query(
    () => Party,
    { nullable: true }
  )
  async checkForMembership(@Arg('userId') userId: string): Promise<Party | null> {
    return this._upNextService.checkForMembership(userId);
  }

  @Query(() => Boolean)
  @Authorized()
  async validToken(@Ctx() context: Context): Promise<boolean> {
    return !!context.member;
  }

  @Query(() => [ PlaylistHistory ])
  @Authorized()
  async history(@Ctx() context: Context): Promise<Array<PlaylistHistory>> {
    return this._partyService.getHistoryFor(context.party);
  }

  @Query(() => Party)
  @Authorized()
  async party(@Ctx() context: Context): Promise<Party> {
    return this._partyService.getById(context.party.id);
  }

  @Query(() => GraphQLJSON)
  @Authorized()
  async spotifyRecommendations(@Ctx() context: Context): Promise<FeaturedPlaylists> {
    return this._upNextService.getRecommendations(context.party);
  }

  @Query(
    () => PartyStateOutput, { nullable: true }
  )
  @Authorized()
  async partyState(@Ctx() context: Context): Promise<PartyStateOutput | null> {
    return this._upNextService.getPartyState(context.party);
  }
  
  @Mutation(() => String)
  async joinParty(
    @Arg('partyCode') partyCode: string,
    @Arg('username') username: string,
    @Arg('userId') userId: string
  ): Promise<string> {
    return this._upNextService.joinParty(
      partyCode,
      username,
      userId
    );
  }

  @Mutation(() => String)
  async leaveParty(@Arg('userId') userId: string): Promise<string> {
    await this._upNextService.leaveParty(userId);
    return userId;
  }

  @Query(() => GraphQLJSON)
  @Authorized()
  async spotifyPlaylist(
    @Ctx() context: Context,
    @Arg('playlistId') playlistId: string,
  ): Promise<PlaylistObject> {
    return this._upNextService.getSpotifyPlaylist(
      context.party,
      playlistId
    );
  }

  @Query(() => GraphQLJSON)
  @Authorized()
  async spotifyAlbum(
    @Ctx() context: Context,
    @Arg('albumId') albumId: string,
  ): Promise<Album> {
    return this._upNextService.getSpotifyAlbum(
      context.party,
      albumId
    );
  }

  @Query(() => GraphQLJSON)
  @Authorized()
  async spotifyArtist(
    @Ctx() context: Context,
    @Arg('artistId') artistId: string,
  ): Promise<FullArtist> {
    return this._upNextService.getSpotifyArtist(
      context.party,
      artistId
    );
  }

  @Query(() => GraphQLJSON)
  @Authorized()
  async spotifySearch(
    @Ctx() context: Context,
    @Arg('query') query: string,
  ): Promise<SearchResultAll> {
    return this._upNextService.searchSpotify(
      context.party,
      query
    );
  }

  @Query(() => [ PlaylistEntry ])
  @Authorized()
  async queue(@Ctx() context: Context): Promise<Array<PlaylistEntry>> {
    return this._partyService.getPlaylistFor(context.party);
  }

  @Mutation(() => String)
  @Authorized()
  async addToQueue(
    @Ctx() context: Context,
    @Arg('songId') songId: string,
  ): Promise<string> {
    await this._upNextService.addToPlaylist(
      context.party,
      context.member,
      songId
    );
    return songId;
  }

  @Mutation(() => PlaylistEntry)
  @Authorized()
  async upvote(
    @Ctx() context: Context,
    @Arg('entryId') entryId: string,
  ): Promise<PlaylistEntry> {
    return this._upNextService.upvote(
      context.member,
      entryId
    );
  }

  @Mutation(() => PlaylistEntry)
  @Authorized()
  async downvote(
    @Ctx() context: Context,
    @Arg('entryId') entryId: string,
  ): Promise<PlaylistEntry> {
    return this._upNextService.downvote(
      context.member,
      entryId
    );
  }
}
