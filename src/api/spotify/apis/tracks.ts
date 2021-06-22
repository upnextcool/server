/**
 * Copyright (c) 2021, Ethan Elliott
 */

import { WebApiRequestBuilder } from '../requests';
import { AudioFeaturesObject, HttpMethods, Track } from '../types';

export class Tracks {

  private static readonly URL = '/v1/tracks';

  public async getTracks(
    token: string, ids: Array<string>
  ): Promise<Track> {
    return WebApiRequestBuilder
      .make(token)
      .withMethod(HttpMethods.GET)
      .withPath(Tracks.URL)
      .withQueryParameters({
        ids: ids.join(','),
        market: 'from_token'
      })
      .build()
      .execute<Track>();
  }

  public async getTrack(
    token: string, trackId: string
  ): Promise<Track> {
    return WebApiRequestBuilder
      .make(token)
      .withMethod(HttpMethods.GET)
      .withPath(`${Tracks.URL}/${trackId}`)
      .withQueryParameters({
        market: 'from_token'
      })
      .build()
      .execute<Track>();
  }

  public async getAudioFeatures(
    token: string, trackId: string
  ): Promise<AudioFeaturesObject> {
    return WebApiRequestBuilder
      .make(token)
      .withMethod(HttpMethods.GET)
      .withPath(`/v1/audio-features/${trackId}`)
      .build()
      .execute<AudioFeaturesObject>();
  }

  public async getAudioAnalysis(
    token: string, trackId: string
  ): Promise<unknown> {
    return WebApiRequestBuilder
      .make(token)
      .withMethod(HttpMethods.GET)
      .withPath(`/v1/audio-analysis/${trackId}`)
      .build()
      .execute<unknown>();
  }
}
