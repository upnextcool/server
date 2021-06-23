/**
 * Copyright (c) 2021, Ethan Elliott
 */

import { PlaylistHistory } from '@UpNext/models';
import { PlaylistHistoryRepository } from '@UpNext/repositories';
import { Service } from 'typedi';
import { OrmRepository } from 'typeorm-typedi-extensions';

@Service()
export class PlaylistHistoryService {
  constructor(@OrmRepository() private readonly _playlistHistoryRepository: PlaylistHistoryRepository) {}

  async addToHistory(entry: Partial<PlaylistHistory>): Promise<PlaylistHistory> {
    return this._playlistHistoryRepository.save(entry);
  }
}
