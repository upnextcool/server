/**
 * Copyright (c) 2021, Ethan Elliott
 */

import { Member, Party, PlaylistEntry, SpotifyAccount } from '@UpNext/models';
import { PartyRepository } from '@UpNext/repositories';
import { Service } from 'typedi';
import { OrmRepository } from 'typeorm-typedi-extensions';

@Service()
export class PartyService {
  constructor(@OrmRepository() private readonly _partyRepository: PartyRepository) {}

  async getAll(): Promise<Array<Party>> {
    return this._partyRepository.find({
      relations: [ 'spotifyAccount' ]
    });
  }

  async getById(id: string): Promise<Party> {
    return this._partyRepository.findOne({
      where: {
        id
      }
    });
  }

  async getByCode(code: string): Promise<Party> {
    return this._partyRepository.findOne({
      where: {
        code: code.toUpperCase()
      }
    });
  }

  async getPlaylistFor(party: Party): Promise<Array<PlaylistEntry>> {
    const p = await this._partyRepository.findOne({ relations: [
      'playlist',
      'playlist.votes' 
    ], where: { id: party.id } });
    return p.playlist;
  }

  async getMembersFor(party: Party): Promise<Array<Member>> {
    const p = await this._partyRepository.findOne({ relations: [ 'members' ], where: { id: party.id } });
    return p.members;
  }

  async getSpotifyAccountFor(party: Party): Promise<SpotifyAccount> {
    const p = await this._partyRepository.findOne({ relations: [ 'spotifyAccount' ], where: { id: party.id } });
    return p.spotifyAccount;
  }

  async createParty(name: string): Promise<Party> {
    return this._partyRepository.save({
      code: 'ABCD',
      name,
      spotifyPlaylistId: 'abc'
    });
  }
}
