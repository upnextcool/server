/**
 * Copyright (c) 2021, Ethan Elliott
 */

import querystring from 'querystring';

import { RequestBuilder } from '../requests';
import { AuthResponse, HttpMethods, RefreshResponse, SCOPES } from '../types';


export class Auth {
  public static ALL_SCOPES = Object.values(SCOPES).join(' ');

  public getAuthStartURL(
    clientID: string,
    redirectURI: string,
    state: string,
    scope: string = Auth.ALL_SCOPES
  ): string {
    return `https://accounts.spotify.com/authorize?${
      querystring.stringify({
        client_id: clientID,
        redirect_uri: redirectURI,
        response_type: 'code',
        scope: scope,
        state: state
      })
    }`;
  }

  public async authorizationCode(
    clientID: string,
    clientSecret: string,
    code: string,
    redirectURI: string
  ): Promise<AuthResponse> {
    return RequestBuilder
      .builder()
      .withHost('accounts.spotify.com')
      .withScheme('https')
      .withHeaders({
        Authorization: `Basic ${Buffer.from(`${clientID}:${clientSecret}`).toString('base64')}`
      })
      .withMethod(HttpMethods.POST)
      .withPath('/api/token')
      .withQueryParameters({
        code,
        grant_type: 'authorization_code',
        redirect_uri: redirectURI
      })
      .build()
      .execute<AuthResponse>();
  }

  public async refreshAuthToken(
    clientID: string,
    clientSecret: string,
    refreshToken: string
  ): Promise<RefreshResponse> {
    return RequestBuilder
      .builder()
      .withHost('accounts.spotify.com')
      .withScheme('https')
      .withHeaders({
        Authorization: `Basic ${Buffer.from(`${clientID}:${clientSecret}`).toString('base64')}`
      })
      .withMethod(HttpMethods.POST)
      .withPath('/api/token')
      .withQueryParameters({
        grant_type: 'refresh_token',
        refresh_token: refreshToken
      })
      .build()
      .execute<AuthResponse>();
  }
}
