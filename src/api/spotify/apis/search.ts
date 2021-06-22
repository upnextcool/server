/**
 * Copyright (c) 2021, Ethan Elliott
 */

import { WebApiRequestBuilder } from '../requests';
import {
  HttpMethods,
  SearchResultAlbums,
  SearchResultAll,
  SearchResultArtists,
  SearchResultPlaylists,
  SearchResultTracks,
} from '../types';

export type JoinedSearchResults = SearchResultAll
  | SearchResultAlbums
  | SearchResultArtists
  | SearchResultTracks
  | SearchResultPlaylists;

export enum SearchTypes {
  ALBUM = 'album',
  ARTIST = 'artist',
  PLAYLIST = 'playlist',
  TRACK = 'track'
}

const MAX_LIMIT = 50;

export class Search {
  private static readonly DEFAULT_SEARCH_URL = '/v1/search';

    private static ALL_TYPES = Object.values(SearchTypes);

    // TODO: possibly remove if unused
    public async search(
      token: string,
      query: string,
      types: Array<SearchTypes>,
      limit: number = MAX_LIMIT,
      offset = 0
    ): Promise<JoinedSearchResults> {
      return WebApiRequestBuilder
        .make(token)
        .withMethod(HttpMethods.GET)
        .withPath(Search.DEFAULT_SEARCH_URL)
        .withQueryParameters({
          limit,
          market: 'from_token',
          offset,
          q: query,
          type: types.join(',')
        })
        .build()
        .execute<SearchResultAll>();
    }

    public async searchEverything(
      token: string,
      query: string,
      limit: number = MAX_LIMIT,
      offset = 0
    ): Promise<SearchResultAll> {
      return WebApiRequestBuilder
        .make(token)
        .withMethod(HttpMethods.GET)
        .withPath(Search.DEFAULT_SEARCH_URL)
        .withQueryParameters({
          limit: limit,
          market: 'from_token',
          offset,
          q: query,
          type: Search.ALL_TYPES.join(',')
        })
        .build()
        .execute<SearchResultAll>();
    }
}
