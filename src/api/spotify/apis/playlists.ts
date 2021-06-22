/**
 * Copyright (c) 2021, Ethan Elliott
 */


import { WebApiRequestBuilder } from '../requests';
import {
  HttpMethods,
  Paging,
  Playlist as PlaylistObject,
  PlaylistDetails,
  PlaylistSnapshot,
  PlaylistTrack,
} from '../types';

const MAX_LIMIT = 50;
const MAX_LIMIT_PLAYLIST_ITEMS = 50;

export class Playlists {

  private static readonly URL = '/v1/playlists'

  public async getPlaylists(
    token: string, limit: number = MAX_LIMIT, offset = 0
  ): Promise<PlaylistObject> {
    return WebApiRequestBuilder
      .make(token)
      .withMethod(HttpMethods.GET)
      .withPath(Playlists.URL)
      .withQueryParameters({
        fields: 'description,name,uri,id,followers,href,images,owner,public,type,tracks.total',
        limit,
        offset
      })
      .build()
      .execute<PlaylistObject>();
  }

  public async getPlaylist(
    token: string, playlistId: string
  ): Promise<PlaylistObject> {
    return WebApiRequestBuilder
      .make(token)
      .withMethod(HttpMethods.GET)
      .withPath(`${Playlists.URL}/${playlistId}`)
      .withQueryParameters({
        fields: 'description,name,uri,id,followers,href,images,owner,public,type,tracks.total'
      })
      .build()
      .execute<PlaylistObject>();
  }

  public async create(
    token: string,
    userId: string,
    details: PlaylistDetails
  ): Promise<PlaylistObject> {
    return WebApiRequestBuilder
      .make(token)
      .withMethod(HttpMethods.POST)
      .withPath(`/v1/users/${userId}/playlists`)
      .withBodyParameters({
        ...details
      })
      .build()
      .execute<PlaylistObject>();
  }

  public async changeDetails(
    token: string,
    playlistId: string,
    details: Partial<PlaylistDetails>
  ): Promise<void> {
    return WebApiRequestBuilder
      .make(token)
      .withMethod(HttpMethods.PUT)
      .withPath(`${Playlists.URL}/${playlistId}`)
      .withBodyParameters({
        ...details
      })
      .build()
      .execute<void>();
  }

  public async getTracks(
    token: string,
    playlistId: string,
    offset = 0,
    limit = MAX_LIMIT_PLAYLIST_ITEMS
  ): Promise<Paging<PlaylistTrack>> {
    return WebApiRequestBuilder
      .make(token)
      .withMethod(HttpMethods.GET)
      .withPath(`${Playlists.URL}/${playlistId}/tracks`)
      .withQueryParameters({
        limit,
        market: 'from_token',
        offset
      })
      .build()
      .execute<Paging<PlaylistTrack>>();
  }

  public async getAllTracks(
    token: string, playlistId: string
  ): Promise<Array<PlaylistTrack>> {
    const items: Array<PlaylistTrack> = [];
    const first50 = await this.getTracks(
      token, playlistId
    );
    items.push(...first50.items);
    if (first50.total > MAX_LIMIT_PLAYLIST_ITEMS) {
      const toDo = new Array(Math.ceil((first50.total - MAX_LIMIT_PLAYLIST_ITEMS) / MAX_LIMIT_PLAYLIST_ITEMS))
        .fill(0);
      const promises = toDo.map(async (
        _, index
      ) => this.getTracks(
        token, playlistId, (index + 1) * MAX_LIMIT_PLAYLIST_ITEMS
      ));
      const remaining = await Promise.all(promises);
      items.push(...remaining.flatMap(element => element.items));
    }
    return items;
  }

  public async addTracks(
    token: string,
    playlistId: string,
    uris: Array<string>
  ): Promise<PlaylistSnapshot> {
    return WebApiRequestBuilder
      .make(token)
      .withMethod(HttpMethods.POST)
      .withPath(`${Playlists.URL}/${playlistId}/tracks`)
      .withBodyParameters({
        uris: uris.map(trackId => `spotify:track:${trackId}`)
      })
      .build()
      .execute<PlaylistSnapshot>();
  }
}
