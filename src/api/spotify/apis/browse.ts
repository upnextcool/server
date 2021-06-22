/**
 * Copyright (c) 2021, Ethan Elliott
 */

import { WebApiRequestBuilder } from '../requests';
import {
  Categories,
  Category,
  FeaturedPlaylists,
  GenreSeeds,
  HttpMethods,
  NewReleases,
  RecommendationsResponse,
} from '../types';

const MAX_LIMIT = 50;

export class Browse {

  private static readonly URL = '/v1/browse';

  public async getNewReleases(
    token: string,
    limit: number = MAX_LIMIT,
    offset = 0
  ): Promise<NewReleases> {
    return WebApiRequestBuilder
      .make(token)
      .withMethod(HttpMethods.GET)
      .withPath(`${Browse.URL}/new-releases`)
      .withQueryParameters({ country: 'from_token', limit, offset })
      .build()
      .execute<NewReleases>();
  }

  public async getFeaturedPlaylists(
    token: string,
    limit: number = MAX_LIMIT,
    offset = 0
  ): Promise<FeaturedPlaylists> {
    return WebApiRequestBuilder
      .make(token)
      .withMethod(HttpMethods.GET)
      .withPath(`${Browse.URL}/featured-playlists`)
      .withQueryParameters({ country: 'from_token', limit, offset })
      .build()
      .execute<FeaturedPlaylists>();
  }

  public async getCategories(
    token: string,
    limit: number = MAX_LIMIT,
    offset = 0
  ): Promise<Categories> {
    return WebApiRequestBuilder
      .make(token)
      .withMethod(HttpMethods.GET)
      .withPath(`${Browse.URL}/categories`)
      .withQueryParameters({ country: 'from_token', limit, offset })
      .build()
      .execute<Categories>();
  }

  public async getCategory(
    token: string, id: string
  ): Promise<Category> {
    return WebApiRequestBuilder
      .make(token)
      .withMethod(HttpMethods.GET)
      .withPath(`${Browse.URL}/categories/${id}`)
      .withQueryParameters({ country: 'from_token' })
      .build()
      .execute<Category>();
  }

  public async getCategoryPlaylists(
    token: string, 
    id: string, 
    limit: number = MAX_LIMIT,
    offset = 0
  ): Promise<Category> {
    return WebApiRequestBuilder
      .make(token)
      .withMethod(HttpMethods.GET)
      .withPath(`${Browse.URL}/categories/${id}/playlists`)
      .withQueryParameters({ country: 'from_token', limit, offset })
      .build()
      .execute<Category>();
  }
  
  public async getRecommendationsFromTracks(
    token: string, 
    trackSeeds: Array<string>,
    limit: number = MAX_LIMIT,
    offset = 0
  ): Promise<RecommendationsResponse> {
    return WebApiRequestBuilder
      .make(token)
      .withMethod(HttpMethods.GET)
      .withPath('/v1/recommendations')
      .withQueryParameters({
        limit,
        market: 'from_token',
        offset,
        seed_tracks: trackSeeds.join(',')
      })
      .build()
      .execute<RecommendationsResponse>();
  }

  public async getRecommendationsFromArtists(
    token: string,
    artistSeeds: Array<string>,
    limit: number = MAX_LIMIT,
    offset = 0
  ): Promise<RecommendationsResponse> {
    return WebApiRequestBuilder
      .make(token)
      .withMethod(HttpMethods.GET)
      .withPath('/v1/recommendations')
      .withQueryParameters({
        limit,
        market: 'from_token',
        offset,
        seed_artists: artistSeeds.join(',')
      })
      .build()
      .execute<RecommendationsResponse>();
  }

  public async getRecommendationsFromGenres(
    token: string,
    genreSeeds: Array<string>,
    limit: number = MAX_LIMIT,
    offset = 0
  ): Promise<RecommendationsResponse> {
    return WebApiRequestBuilder
      .make(token)
      .withMethod(HttpMethods.GET)
      .withPath('/v1/recommendations')
      .withQueryParameters({
        limit,
        market: 'from_token',
        offset,
        seed_genres: genreSeeds.join(',')
      })
      .build()
      .execute<RecommendationsResponse>();
  }

  public async getAvailableRecommendationGenres(token: string): Promise<GenreSeeds> {
    return WebApiRequestBuilder
      .make(token)
      .withMethod(HttpMethods.GET)
      .withPath('/v1/recommendations/available-genre-seeds')
      .build()
      .execute<GenreSeeds>();
  }
}
