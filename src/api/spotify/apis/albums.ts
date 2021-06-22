/**
 * Copyright (c) 2021, Ethan Elliott
 */

import { WebApiRequestBuilder } from '../requests';
import { Album, AlbumArray, HttpMethods, Paging, SimplifiedTrack } from '../types';

const MAX_LIMIT = 50;

export class Albums {
  private static readonly URL = '/v1/albums'

  public async getAlbums(
    token: string, ids: Array<string>
  ): Promise<AlbumArray> {
    return WebApiRequestBuilder
      .make(token)
      .withMethod(HttpMethods.GET)
      .withPath(Albums.URL)
      .withQueryParameters({ ids: ids.join(','), market: 'from_token' })
      .build()
      .execute<AlbumArray>();
  }
  
  public async getAlbum(
    token: string, id: string
  ): Promise<Album> {
    return WebApiRequestBuilder
      .make(token)
      .withMethod(HttpMethods.GET)
      .withPath(`${Albums.URL}/${id}`)
      .withQueryParameters({ market: 'from_token' })
      .build()
      .execute<Album>();
  }

  public async getAlbumTracks(
    token: string,
    id: string,
    limit = MAX_LIMIT,
    offset = 0
  ): Promise<Paging<SimplifiedTrack>> {
    return WebApiRequestBuilder
      .make(token)
      .withMethod(HttpMethods.GET)
      .withPath(`${Albums.URL}/${id}/tracks`)
      .withQueryParameters({ limit, market: 'from_token', offset })
      .build().execute<Paging<SimplifiedTrack>>();
  }

}
