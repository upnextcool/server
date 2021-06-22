/**
 * Copyright (c) 2021, Ethan Elliott
 */

import { WebApiRequestBuilder } from '../requests';
import {
  Artist,
  ArtistArray,
  ArtistArray as ArtistsArray,
  HttpMethods,
  Paging,
  SimplifiedAlbum,
  TrackArray,
} from '../types';

const MAX_LIMIT = 50;

export class Artists {
  
  private static readonly URL = '/v1/artists';

  private static readonly INCLUDE_GROUPS = [
    'album',
    'single' 
  ].join(',');

  public async getArtists(
    token: string, ids: Array<string>
  ): Promise<ArtistArray> {
    return WebApiRequestBuilder
      .make(token)
      .withMethod(HttpMethods.GET)
      .withPath(Artists.URL)
      .withQueryParameters({ ids: ids.join(',') })
      .build()
      .execute<ArtistArray>();
  }
  
  public async getArtist(
    token: string, id: string
  ): Promise<Artist> {
    return WebApiRequestBuilder
      .make(token)
      .withMethod(HttpMethods.GET)
      .withPath(`${Artists.URL}/${id}`)
      .build()
      .execute<Artist>();
  }

  public async getTopTracks(
    token: string, id: string
  ): Promise<TrackArray> {
    return WebApiRequestBuilder
      .make(token)
      .withMethod(HttpMethods.GET)
      .withPath(`${Artists.URL}/${id}/top-tracks`)
      .withQueryParameters({ market: 'from_token' })
      .build()
      .execute<TrackArray>();
  }

  public async getRelatedArtists(
    token: string, id: string
  ): Promise<ArtistsArray> {
    return WebApiRequestBuilder
      .make(token)
      .withMethod(HttpMethods.GET)
      .withPath(`${Artists.URL}/${id}/related-artists`)
      .withQueryParameters({ market: 'from_token' })
      .build()
      .execute<ArtistsArray>();
  }
  
  public async getAlbums(
    token: string, 
    id: string, 
    limit = MAX_LIMIT, 
    offset = 0
  ): Promise<Paging<SimplifiedAlbum>> {
    return WebApiRequestBuilder
      .make(token)
      .withMethod(HttpMethods.GET)
      .withPath(`${Artists.URL}/${id}/albums`)
      .withQueryParameters({
        include_groups: Artists.INCLUDE_GROUPS,
        limit,
        market: 'from_token',
        offset
      })
      .build()
      .execute<Paging<SimplifiedAlbum>>();
  }

  public async getAllAlbums(
    token: string,
    id: string
  ): Promise<Array<SimplifiedAlbum>> {
    const items: Array<SimplifiedAlbum> = [];
    const first50 = await this.getAlbums(
      token, id
    );
    items.push(...first50.items);
    if (first50.total > MAX_LIMIT) {
      const remaining = await Promise.all(Array.from({ length: Math.ceil(first50.total - MAX_LIMIT) % MAX_LIMIT })
        .fill(0)
        .map((
          _, index
        ) => this.getAlbums(
          token, id, MAX_LIMIT, index * MAX_LIMIT
        )));
      items.push(...remaining.flatMap(element => element.items));
    }
    return items;
  }
}
