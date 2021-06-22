/**
 * Copyright (c) 2021, Ethan Elliott
 */

import { WebApiRequestBuilder } from '../requests';
import { CurrentlyPlaying, Devices, HttpMethods } from '../types';

export class Player {
  
  private static readonly URL = '/v1/me/player'

  public async getPlayingContext(token: string): Promise<CurrentlyPlaying> {
    return WebApiRequestBuilder
      .make(token)
      .withMethod(HttpMethods.GET)
      .withPath(Player.URL)
      .build()
      .execute<CurrentlyPlaying>();
  }

  public async transferDevice(
    token: string,
    deviceId: string,
    play = false
  ): Promise<Devices> {
    return WebApiRequestBuilder
      .make(token)
      .withMethod(HttpMethods.PUT)
      .withPath(Player.URL)
      .withBodyParameters({
        device_ids: [ deviceId ],
        play
      })
      .build()
      .execute<Devices>();
  }

  public async getDevices(token: string): Promise<Devices> {
    return WebApiRequestBuilder
      .make(token)
      .withMethod(HttpMethods.GET)
      .withPath(`${Player.URL}/devices`)
      .build()
      .execute<Devices>();
  }

  public async getCurrentlyPlaying(token: string): Promise<CurrentlyPlaying> {
    return WebApiRequestBuilder
      .make(token)
      .withMethod(HttpMethods.GET)
      .withPath(`${Player.URL}/currently-playing`)
      .build()
      .execute<CurrentlyPlaying>();
  }

  public async play(token: string): Promise<void> {
    return WebApiRequestBuilder
      .make(token)
      .withMethod(HttpMethods.PUT)
      .withPath(`${Player.URL}/play`)
      .build()
      .execute<void>();
  }

  public async playSong(
    token: string, songId: string
  ): Promise<void> {
    return WebApiRequestBuilder
      .make(token)
      .withMethod(HttpMethods.PUT)
      .withPath(`${Player.URL}/play`)
      .withBodyParameters({
        uris: [ `spotify:track:${songId}` ]
      })
      .build()
      .execute<void>();
  }

  public async pause(token: string): Promise<void> {
    return WebApiRequestBuilder
      .make(token)
      .withMethod(HttpMethods.PUT)
      .withPath(`${Player.URL}/pause`)
      .build()
      .execute<void>();
  }

  public async nextSong(token: string): Promise<void> {
    return WebApiRequestBuilder
      .make(token)
      .withMethod(HttpMethods.POST)
      .withPath(`${Player.URL}/next`)
      .build()
      .execute<void>();
  }

  public async previousSong(token: string): Promise<void> {
    return WebApiRequestBuilder
      .make(token)
      .withMethod(HttpMethods.POST)
      .withPath(`${Player.URL}/previous`)
      .build()
      .execute<void>();
  }

  public async trackSeek(
    token: string, positionMs: number
  ): Promise<void> {
    return WebApiRequestBuilder
      .make(token)
      .withMethod(HttpMethods.PUT)
      .withPath(`${Player.URL}/seek`)
      .withQueryParameters({
        position_ms: positionMs
      })
      .build()
      .execute<void>();
  }

  public async setVolume(
    token: string, volumePercent: number
  ): Promise<void> {
    return WebApiRequestBuilder
      .make(token)
      .withMethod(HttpMethods.PUT)
      .withPath(`${Player.URL}/volume`)
      .withQueryParameters({
        volume_percent: volumePercent
      })
      .build()
      .execute<void>();
  }

  public async addSongToEndOfQueue(
    token: string, trackId: string
  ): Promise<void> {
    return WebApiRequestBuilder
      .make(token)
      .withMethod(HttpMethods.POST)
      .withPath(`${Player.URL}/queue`)
      .withQueryParameters({ uri: `spotify:track:${trackId}` })
      .build()
      .execute<void>();
  }
}
