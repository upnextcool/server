/**
 * Copyright (c) 2021, Ethan Elliott
 */

import { environment } from '@UpNext/environment';
import { Party, SpotifyAccount } from '@UpNext/models';
import { SpotifyAccountRepository } from '@UpNext/repositories';
import { SpotifyService } from '@UpNext/services/spotify.service';
import dayjs from 'dayjs';
import { Service } from 'typedi';
import { OrmRepository } from 'typeorm-typedi-extensions';

@Service()
export class SpotifyAccountService {
  constructor(
    @OrmRepository() private readonly _spotifyAccountRepository: SpotifyAccountRepository,
    private readonly _spotifyService: SpotifyService
  ) {}

  async getAll(): Promise<Array<SpotifyAccount>> {
    return this._spotifyAccountRepository.find();
  }

  async getById(id: string): Promise<SpotifyAccount> {
    return this._spotifyAccountRepository.findOne({
      where: {
        id
      }
    });
  }

  async getPartyFor(spotifyAccount: SpotifyAccount): Promise<Party> {
    const sa = await this._spotifyAccountRepository.findOne({
      relations: [ 'party' ],
      where: {
        id: spotifyAccount.id
      }
    });
    return sa.party;
  }

  async addAccount(spotifyAccount: Partial<SpotifyAccount>): Promise<SpotifyAccount> {
    return this._spotifyAccountRepository.save(spotifyAccount);
  }

  async refreshTokenFor(party: Party): Promise<void> {
    const tt = await this._spotifyService.spotifyApis.auth.refreshAuthToken(
      environment.spotify.clientID,
      environment.spotify.clientSecret,
      party.spotifyAccount.refreshToken
    );
    await this._spotifyAccountRepository.update(
      { id: party.spotifyAccount.id }, 
      {
        token: tt.access_token,
        tokenExpire: dayjs().add(
          tt.expires_in,
          'seconds'
        ).toDate()
      }
    );
  }
}
