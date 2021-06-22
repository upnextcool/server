/**
 * Copyright (c) 2021, Ethan Elliott
 */

import { Party } from '@UpNext/models';
import { CurrentlyPlaying } from '@UpNext/spotify';
import { ArtworkPalette, PartyState, PartyStateEnum } from '@UpNext/types';
import Vibrant from 'node-vibrant';
import { Service } from 'typedi';

export interface StoredState {
  state: PartyStateEnum;
  currentlyPlaying: CurrentlyPlaying;
  partyState: PartyState;
}

@Service()
export class PartyStateService {
  private _partySpotifyStates: Map<string, StoredState> = new Map<string, StoredState>();
  
  setStateFor(
    party: Party,
    state: StoredState
  ): void {
    this._partySpotifyStates.set(
      party.id, state
    );
  }

  getStateFor(party: Party): StoredState {
    return this._partySpotifyStates.has(party.id)
      ? this._partySpotifyStates.get(party.id)
      : undefined;
  }
  
  private _nextSongQueue: Map<string, {isQueued: boolean, spotifyId: string}> 
    = new Map<string, {isQueued: boolean, spotifyId: string}>();

  setNextSongQueued(
    party: Party,
    spotifyId: string
  ): void {
    this._nextSongQueue.set(
      party.id, { isQueued: true, spotifyId }
    );
  }
  
  setEmptyNextSongQueue(party: Party): void {
    this._nextSongQueue.set(
      party.id,
      { isQueued: false, spotifyId: '' }
    );
  }

  hasSongQueued(party: Party): boolean {
    const x = this._nextSongQueue.get(party.id);
    return x ? x.isQueued:false;
  }
  
  updateState(
    previousState: PartyState,
    newState: Partial<PartyState>
  ): PartyState {
    return {
      ...previousState,
      ...newState
    };
  }

  async computePalette(artwork: string): Promise<ArtworkPalette> {
    const palette = await Vibrant.from(artwork).getSwatches();
    return {
      darkMuted: palette.DarkMuted.hex,
      darkVibrant: palette.DarkVibrant.hex,
      lightMuted: palette.LightMuted.hex,
      lightVibrant: palette.LightVibrant.hex,
      muted: palette.Muted.hex,
      vibrant: palette.Vibrant.hex,
    };
  }
}
