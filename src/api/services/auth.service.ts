/**
 * Copyright (c) 2021, Ethan Elliott
 */

import 'reflect-metadata';

import { environment } from '@UpNext/environment';
import {
  ActiveAuthService,
  PartyService,
  SpotifyAccountService,
  SpotifyService,
  TokenService,
  UserService,
} from '@UpNext/services';
import { SCOPES } from '@UpNext/spotify';
import dayjs from 'dayjs';
import { Inject, Service } from 'typedi';
import validator from 'validator';

export interface ActiveAuthToken {
  authId: string;
}

@Service()
export class AuthService {
  private static readonly AUTH_SCOPES = [
    SCOPES.USER_READ_PLAYBACK_STATE,
    SCOPES.USER_MODIFY_PLAYBACK_STATE,
    SCOPES.USER_READ_CURRENTLY_PLAYING,
    SCOPES.STREAMING,
    SCOPES.USER_READ_EMAIL,
    SCOPES.USER_READ_PRIVATE,
    SCOPES.PLAYLIST_MODIFY_PUBLIC,
    SCOPES.USER_READ_PLAYBACK_POSITION,
    SCOPES.APP_REMOTE_CONTROL
  ].join(' ');

  constructor(
    // So some strange bug is forcing me to manually define the Injected Services,
    // EXCEPT SOME OF THEM????
    @Inject(type => UserService) private readonly _userService: UserService,
    @Inject(type => SpotifyService) private readonly _spotifyService: SpotifyService,
    private readonly _activeAuthService: ActiveAuthService,
    @Inject(type => SpotifyAccountService) private readonly _spotifyAccountService: SpotifyAccountService,
    @Inject(type => PartyService) private readonly _partyService: PartyService,
    @Inject(type => TokenService) private readonly _tokenService: TokenService
  ) {}

  async startAuthGetRedirectUrl(
    userId: string,
    partyId: string
  ): Promise<string> {
    if (!userId || !validator.isUUID(userId)) {
      throw new Error('Invalid User ID');
    }

    if (!partyId || !validator.isUUID(partyId)) {
      throw new Error('Invalid User ID');
    }

    const user = await this._userService.getById(userId);

    if (!user) {
      throw new Error('User does not exist');
    }

    const party = await this._partyService.getById(partyId);

    if (!party) {
      throw new Error('Party does not exist');
    }

    const account = await this._partyService.getSpotifyAccountFor(party);

    if (account) {
      throw new Error('Party already authenticated');
    }

    const activeAuth = await this._activeAuthService.startNewAuth(
      user,
      party
    );
    
    const token = this._tokenService.generate<ActiveAuthToken>({ authId: activeAuth.id });

    return this._spotifyService.spotifyApis.auth.getAuthStartURL(
      environment.spotify.clientID,
      environment.spotify.redirectURI,
      token,
      AuthService.AUTH_SCOPES
    );
  }

  async oAuthCallback(
    code: string, state: string
  ): Promise<string> {
    const x = await this._spotifyService.spotifyApis.auth.authorizationCode(
      environment.spotify.clientID,
      environment.spotify.clientSecret,
      code,
      environment.spotify.redirectURI
    );
    
    const spotifyUser = await this._spotifyService.spotifyApis.users.getCurrent(x.access_token);

    const parsedState = this._tokenService.verify<ActiveAuthToken>(state);
    const activeAuth = await this._activeAuthService.getById(parsedState.authId);
    if (!activeAuth) {
      throw new Error('Invalid authentication session');
    }
    const party = await this._partyService.getById(activeAuth.party.id);
    
    await this._spotifyAccountService.addAccount({
      party,
      refreshToken: x.refresh_token,
      spotifyUserId: spotifyUser.id,
      token: x.access_token,
      tokenExpire: dayjs().add(
        x.expires_in, 
        'seconds'
      ).toDate()
    });
    await this._activeAuthService.remove(activeAuth);

    return party.id;
  }
}
