/**
 * Copyright (c) 2021, Ethan Elliott
 */

import { Member, Party, PlaylistEntry, Vote } from '@UpNext/models';
import { PlaylistEntryRepository } from '@UpNext/repositories';
import { Service } from 'typedi';
import { OrmRepository } from 'typeorm-typedi-extensions';

@Service()
export class PlaylistEntryService {
  constructor(@OrmRepository() private readonly _playlistEntryRepository: PlaylistEntryRepository) {}

  async getAll(): Promise<Array<PlaylistEntry>> {
    return this._playlistEntryRepository.find();
  }

  async getById(id: string): Promise<PlaylistEntry> {
    return this._playlistEntryRepository.findOne({
      relations: [
        'votes',
        'votes.member',
        'addedBy'
      ],
      where: {
        id
      }
    });
  }

  async getAddedByFor(playlistEntry: PlaylistEntry): Promise<Member> {
    const m = await this._playlistEntryRepository.findOne({ relations: [ 'addedBy' ], where: { id: playlistEntry.id } });
    return m.addedBy;
  }

  async getPartyFor(playlistEntry: PlaylistEntry): Promise<Party> {
    const m = await this._playlistEntryRepository.findOne({ relations: [ 'party' ], where: { id: playlistEntry.id } });
    return m.party;
  }

  async getVotesFor(playlistEntry: PlaylistEntry): Promise<Array<Vote>> {
    const m = await this._playlistEntryRepository.findOne({ relations: [ 'votes' ], where: { id: playlistEntry.id } });
    return m.votes;
  }

  async newEntry(entry: Partial<PlaylistEntry>): Promise<PlaylistEntry> {
    return this._playlistEntryRepository.save(entry);
  }

  async update(entry: PlaylistEntry): Promise<PlaylistEntry> {
    return this._playlistEntryRepository.save(entry);
  }

  async remove(nextSong: PlaylistEntry): Promise<void> {
    await this._playlistEntryRepository.remove(nextSong);
  }
}
