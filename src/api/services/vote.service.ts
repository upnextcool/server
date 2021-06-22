/**
 * Copyright (c) 2021, Ethan Elliott
 */

import { Member, PlaylistEntry, Vote } from '@UpNext/models';
import { VoteRepository } from '@UpNext/repositories';
import { Service } from 'typedi';
import { OrmRepository } from 'typeorm-typedi-extensions';

@Service()
export class VoteService {
  constructor(@OrmRepository() private readonly _voteRepository: VoteRepository) {}

  async getAll(): Promise<Array<Vote>> {
    return this._voteRepository.find();
  }

  async getById(id: string): Promise<Vote> {
    return this._voteRepository.findOne({
      where: {
        id
      }
    });
  }

  async getMemberFor(vote: Vote): Promise<Member> {
    const v = await this._voteRepository.findOne({ relations: [ 'member' ], where: { id: vote.id } });
    return v.member;
  }

  async getPlaylistEntryFor(vote: Vote): Promise<PlaylistEntry> {
    const v = await this._voteRepository.findOne({ relations: [ 'playlistEntry' ], where: { id: vote.id } });
    return v.playlistEntry;
  }

  async newVote(vote: Partial<Vote>): Promise<Vote> {
    return this._voteRepository.save(vote);
  }

  async remove(vote: Vote): Promise<void> {
    await this._voteRepository.remove(vote);
  }
}
