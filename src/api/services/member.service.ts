/**
 * Copyright (c) 2021, Ethan Elliott
 */

import { Member, Party, User, Vote } from '@UpNext/models';
import { MemberRepository } from '@UpNext/repositories';
import { Service } from 'typedi';
import { OrmRepository } from 'typeorm-typedi-extensions';

@Service()
export class MemberService {
  constructor(@OrmRepository() private readonly _memberRepository: MemberRepository) {}

  async getAll(): Promise<Array<Member>> {
    return this._memberRepository.find();
  }

  async getById(id: string): Promise<Member> {
    return this._memberRepository.findOne({
      where: {
        id
      }
    });
  }

  async getByUser(user: User): Promise<Member> {
    return this._memberRepository.findOne({
      where: {
        user
      }
    });
  }

  async getByUsername(username: string): Promise<Member> {
    return this._memberRepository.findOne({
      where: {
        username
      }
    });
  }

  async getByAllByParty(party: Party): Promise<Array<Member>> {
    return this._memberRepository.find({
      where: {
        party
      }
    });
  }

  async getPartyFor(member: Member): Promise<Party> {
    const m = await this._memberRepository.findOne({ relations: [ 'party' ], where: { id: member.id } });
    return m.party;
  }

  async getUserFor(member: Member): Promise<User> {
    const m = await this._memberRepository.findOne({ relations: [ 'user' ], where: { id: member.id } });
    return m.user;
  }

  async getVotesFor(member: Member): Promise<Array<Vote>> {
    const m = await this._memberRepository.findOne({ relations: [ 'votes' ], where: { id: member.id } });
    return m.votes;
  }

  async new(member: Partial<Member>): Promise<Member> {
    const m = await this.getByUser(member.user);
    if (m) {
      return m;
    }
    return this._memberRepository.save(member);
  }

  async remove(member: Member): Promise<void> {
    await this._memberRepository.remove(member);
  }
}
