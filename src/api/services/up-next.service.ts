/**
 * Copyright (c) 2021, Ethan Elliott
 */

import { Member, Party, PlaylistEntry } from '@UpNext/models';
import { MemberService } from '@UpNext/services/member.service';
import { PartyService } from '@UpNext/services/party.service';
import { PartyStateService } from '@UpNext/services/party-state.service';
import { PlaylistEntryService } from '@UpNext/services/playlist-entry.service';
import { PlaylistHistoryService } from '@UpNext/services/playlist-history.service';
import { SpotifyService } from '@UpNext/services/spotify.service';
import { TokenService } from '@UpNext/services/token.service';
import { UserService } from '@UpNext/services/user.service';
import { VoteService } from '@UpNext/services/vote.service';
import {
  Album,
  Artist,
  CurrentlyPlaying,
  FeaturedPlaylists,
  Playlist as PlaylistObject,
  SearchResultAll,
  SimplifiedAlbum,
  Track,
  TrackArray,
} from '@UpNext/spotify';
import { PartyState, PartyStateEnum, VoteTypeEnum } from '@UpNext/types';
import { AccessToken } from '@UpNext/types/access-token';
import { Service } from 'typedi';


export interface FullArtist {
  info: Artist,
  tracks: TrackArray,
  albums: Array<SimplifiedAlbum>
}

@Service()
export class UpNextService {
  constructor(
    private readonly _memberService: MemberService,
    private readonly _userService: UserService,
    private readonly _partyService: PartyService,
    private readonly _tokenService: TokenService,
    private readonly _spotifyService: SpotifyService,
    private readonly _partyStateService: PartyStateService,
    private readonly _playlistEntryService: PlaylistEntryService,
    private readonly _voteService: VoteService,
    private readonly _playlistHistoryService: PlaylistHistoryService
  ) {}

  async joinParty(
    partyCode: string,
    username: string,
    userId: string
  ): Promise<string> {
    const user = await this._userService.getById(userId);
    const party = await this._partyService.getByCode(partyCode);

    if (!user) {
      throw new Error('User does not exist');
    }
    
    if (!party) {
      throw new Error('Party does not exist');
    }

    const activeMember = await this._userService.getMemberFor(user);

    if (activeMember) {
      throw new Error('Cannot join a party you\'re already a member of');
    }

    const member = await this._memberService.new({
      party,
      user,
      username
    });

    return this._tokenService.generate<AccessToken>({ memberId: member.id });
  }

  // If the user is already a member of a party, return the party
  async checkForMembership(userId: string): Promise<Party | null> {
    const user = await this._userService.getById(userId);
    if (!user) {
      throw new Error('User does not exist');
    }
    const member = await this._memberService.getByUser(user);
    
    if (member) {
      return this._memberService.getPartyFor(member);
    }
    
    return undefined;
  }

  async leaveParty(userId: string): Promise<void> {
    const user = await this._userService.getById(userId);
    const m = await this._memberService.getByUser(user);
    if (!m) {
      throw new Error('Cannot leave party you aren\'t a member of');
    }
    await this._memberService.remove(m);
  }

  async getRecommendations(party: Party): Promise<FeaturedPlaylists> {
    const spotifyAccount = await this._partyService.getSpotifyAccountFor(party);
    return this._spotifyService.spotifyApis.browse.getFeaturedPlaylists(spotifyAccount.token);
  }

  async getSpotifyPlaylist(
    party: Party,
    playlistId: string
  ): Promise<PlaylistObject> {
    const spotifyAccount = await this._partyService.getSpotifyAccountFor(party);
    const playlist = await this._spotifyService.spotifyApis.playlist.getPlaylist(
      spotifyAccount.token, playlistId
    );
    const tracks = await this._spotifyService.spotifyApis.playlist.getAllTracks(
      spotifyAccount.token,
      playlist.id
    );
    playlist.tracks = tracks;
    return playlist;
  }

  getPartyState(party: Party): PartyState {
    return this._partyStateService.getStateFor(party).partyState;
  }

  async searchSpotify(
    party: Party,
    query: string
  ): Promise<SearchResultAll> {
    const spotifyAccount = await this._partyService.getSpotifyAccountFor(party);
    return this._spotifyService.spotifyApis.search.searchEverything(
      spotifyAccount.token, query
    );
  }

  async getSpotifyAlbum(
    party: Party,
    albumId: string
  ): Promise<Album> {
    const spotifyAccount = await this._partyService.getSpotifyAccountFor(party);
    return this._spotifyService.spotifyApis.albums.getAlbum(
      spotifyAccount.token, albumId
    );
  }

  async getSpotifyArtist(
    party: Party,
    artistId: string
  ): Promise<FullArtist> {
    const spotifyAccount = await this._partyService.getSpotifyAccountFor(party);
    const artist = await this._spotifyService.spotifyApis.artists.getArtist(
      spotifyAccount.token,
      artistId
    );
    const tracks = await this._spotifyService.spotifyApis.artists.getTopTracks(
      spotifyAccount.token, 
      artistId
    );
    const albums = await this._spotifyService.spotifyApis.artists.getAllAlbums(
      spotifyAccount.token,
      artistId
    );
    const cleanedAlbums = this.cleanAlbums(albums);
    return {
      albums: cleanedAlbums,
      info: artist,
      tracks
    };
  }

  async addToPlaylist(
    party: Party,
    member: Member,
    songId: string
  ): Promise<void> {
    const spotifyAccount = await this._partyService.getSpotifyAccountFor(party);
    const x = await this._spotifyService.spotifyApis.tracks.getTrack(
      spotifyAccount.token, 
      songId
    );
    await this._playlistEntryService.newEntry({
      addedBy: member,
      albumArtwork: x.album.images[0].url,
      artist: x.artists.map(m => m.name).join(', '),
      name: x.name,
      party,
      spotifyId: x.id
    });
  }

  async upvote(
    member: Member,
    entryId: string
  ): Promise<PlaylistEntry> {
    return this.vote(
      entryId, 
      member,
      VoteTypeEnum.UP_VOTE
    );
  }

  async downvote(
    member: Member,
    entryId: string
  ): Promise<PlaylistEntry> {
    return this.vote(
      entryId,
      member,
      VoteTypeEnum.DOWN_VOTE
    );
  }

  private async vote(
    entryId: string, 
    member: Member, 
    voteType: VoteTypeEnum
  ) {
    const entry = await this._playlistEntryService.getById(entryId);
    const memberVotes = entry.votes.filter(mvEntry => mvEntry.member.id === member.id);
    if (memberVotes.length > 0) {
      if (memberVotes[0].type === voteType) {
        return entry;
      } else if (memberVotes[0].type === this.oppositeOf(voteType)) {
        await this._voteService.remove(memberVotes[0]);
      }
    }
    await this._voteService.newVote({
      member,
      playlistEntry: entry,
      type: voteType,
    });
    return entry;
  }
  
  private oppositeOf(voteType: VoteTypeEnum): VoteTypeEnum {
    return [
      VoteTypeEnum.UP_VOTE,
      VoteTypeEnum.DOWN_VOTE 
    ].filter(type => type !== voteType).pop();
  }

  async partyLoopStuff(party: Party): Promise<void> {
    try {
      const currentSpotifyState = await this._spotifyService.spotifyApis.player
        .getCurrentlyPlaying(party.spotifyAccount.token);

      const previousState = await this._partyStateService.getStateFor(party);

      const currentPartyState = await this.determineCurrentState(
        party,
        currentSpotifyState,
        previousState ? previousState.currentlyPlaying : undefined
      );

      const computedPartyState = await this.stateMachine(
        party,
        currentPartyState,
        currentSpotifyState,
        previousState ? previousState.partyState : undefined
      );

      this._partyStateService.setStateFor(
        party,
        {
          currentlyPlaying: currentSpotifyState,
          partyState: computedPartyState,
          state: currentPartyState,
        }
      );
    } catch(error) {
      console.error(
        `Looks like we have an issue with party: '${party.name}'`, error
      );
    }
  }
  
  private async stateMachine(
    party: Party,
    currentPartyState: PartyStateEnum, 
    currentSpotifyState: CurrentlyPlaying,
    previousPartyState: PartyState
  ): Promise<PartyState> {
    switch (currentPartyState) {
    case PartyStateEnum.NEW_SONG:
      return this.newSongState(
        party, currentSpotifyState
      );
    case PartyStateEnum.NEXT_FROM_QUEUE:
      return this.nextFromQueueState(
        party, previousPartyState, currentSpotifyState
      );
    case PartyStateEnum.PLAYING:
      return this._partyStateService.updateState(
        previousPartyState, 
        {
          playing: currentSpotifyState.is_playing,
          progress: currentSpotifyState.progress_ms
        }
      );
    case PartyStateEnum.PAUSED:
      return this._partyStateService.updateState(
        previousPartyState, {}
      );
    case PartyStateEnum.NOTHING_PLAYING:
      return undefined;
    default:
      console.error('UNKNOWN STATE');
    }
    return undefined;
  }

  private async nextFromQueueState(
    party: Party, previousPartyState: PartyState, currentSpotifyState: CurrentlyPlaying
  ): Promise<PartyState> {
    const playlist = await this._partyService.getPlaylistFor(party);
    if (playlist.length > 0 && !this._partyStateService.hasSongQueued(party)) {
      const sorted = playlist.map(entry => ({
        ...entry,
        score: entry.votes
          .map(v => v.type === VoteTypeEnum.UP_VOTE ? 1 : -1)
          .reduce(
            (
              p,
              c,
            ) => p + c, 0,
          ),
      })).sort((
        a, b,
      ) => b.score - a.score);
      const [ nextSong ] = sorted;
      const spotifyAccount = await this._partyService.getSpotifyAccountFor(party);
      await this._spotifyService.spotifyApis.player.addSongToEndOfQueue(
        spotifyAccount.token,
        nextSong.spotifyId,
      );
      await this._playlistEntryService.remove(nextSong);
      this._partyStateService.setNextSongQueued(
        party,
        nextSong.spotifyId,
      );
    }
    return this._partyStateService.updateState(
      previousPartyState,
      {
        playing: currentSpotifyState.is_playing,
        progress: currentSpotifyState.progress_ms,
      },
    );
  }

  private async newSongState(
    party: Party, currentSpotifyState: CurrentlyPlaying
  ): Promise<PartyState> {
    await this._spotifyService.spotifyApis.playlist.addTracks(
      party.spotifyAccount.token,
      party.spotifyPlaylistId,
      [ currentSpotifyState.item.id ],
    );
    const artwork = currentSpotifyState.item.album.images
      .find(image => image.height===
        Math.max(...currentSpotifyState.item.album.images.map(p => p.height))).url;
    this._partyStateService.setEmptyNextSongQueue(party);
    await this._playlistHistoryService.addToHistory({
      albumArtwork: artwork,
      artist: currentSpotifyState.item.artists.map(a => a.name).join(', '),
      name: currentSpotifyState.item.name,
      party,
      spotifyId: currentSpotifyState.item.id,
    });
    return this._partyStateService.updateState(
      undefined, {
        artist: currentSpotifyState.item.artists.map(a => a.name).join(', '),
        artwork,
        duration: currentSpotifyState.item.duration_ms,
        name: currentSpotifyState.item.name,
        palette: await this._partyStateService.computePalette(artwork),
        playing: currentSpotifyState.is_playing,
        progress: currentSpotifyState.progress_ms,
        spotifyId: currentSpotifyState.item.id,
      },
    );
  }

  private async determineCurrentState(
    party: Party,
    currentState: CurrentlyPlaying, 
    previousState: CurrentlyPlaying
  ): Promise<PartyStateEnum> {
    if (!currentState) {
      return PartyStateEnum.NOTHING_PLAYING;
    }
    if (!previousState) {
      return PartyStateEnum.NEW_SONG;
    }
    if (currentState.is_playing) {
      if (currentState.item.id === previousState.item.id) {
        if (currentState.item.duration_ms - currentState.progress_ms < 10_000
          && !this._partyStateService.hasSongQueued(party)) {
          return PartyStateEnum.NEXT_FROM_QUEUE;
        }
        return PartyStateEnum.PLAYING;
      }
      return PartyStateEnum.NEW_SONG;
    }
    return PartyStateEnum.PAUSED;

  }

  async getSpotifySong(
    party: Party,
    songId: string
  ): Promise<Track> {
    const spotifyAccount = await this._partyService.getSpotifyAccountFor(party);
    return this._spotifyService.spotifyApis.tracks.getTrack(
      spotifyAccount.token, songId
    );
  }

  private cleanAlbums(albums: Array<SimplifiedAlbum>): Array<SimplifiedAlbum> {
    const dedupedAlbums = this.dedupeAlbums(albums);
    const albumMap = new Map<string, Array<SimplifiedAlbum>>();
    dedupedAlbums.forEach(album => {
      if (albumMap.has(album.name)) {
        const x = albumMap.get(album.name);
        x.push(album);
        albumMap.set(
          album.name,
          x
        );
      } else {
        albumMap.set(
          album.name,
          [ album ]
        );
      }
    });
    const cleanedAlbums = [];
    albumMap.forEach((value) => {
      cleanedAlbums.push(...value);
    });
    return cleanedAlbums;
  }
  
  private dedupeAlbums(albums: Array<SimplifiedAlbum>): Array<SimplifiedAlbum> {
    const hashTable = albums.reduce(
      (
        a, c
      ) => ({
        ...a,
        [c.id]: c,
      }),
      {}
    );
    const noDupe = [];
    new Set(albums.map((album) => `${album.id}`)).forEach((albumId) => {
      noDupe.push(hashTable[albumId]);
    });
    return noDupe;
  }
}
