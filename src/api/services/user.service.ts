/**
 * Copyright (c) 2021, Ethan Elliott
 */

import { Member, User } from '@UpNext/models';
import { UserRepository } from '@UpNext/repositories';
import { Service } from 'typedi';
import { OrmRepository } from 'typeorm-typedi-extensions';

@Service()
export class UserService {
  constructor(@OrmRepository() private readonly _userRepository: UserRepository) {}

  async getAll(): Promise<Array<User>> {
    return this._userRepository.find();
  }

  async getById(id: string): Promise<User> {
    return this._userRepository.findOne({
      where: {
        id
      }
    });
  }

  async getByMember(member: Member): Promise<User> {
    return this._userRepository.findOne({
      where: {
        member
      }
    });
  }

  async getByFingerprint(fingerprint: string): Promise<User> {
    return this._userRepository.findOne({
      where: {
        fingerprint
      }
    });
  }

  async getMemberFor(user: User): Promise<Member> {
    const u = await this._userRepository.findOne({ relations: [ 'member' ], where: { id: user.id } });
    return u.member;
  }

  async newUser(fingerprint: string): Promise<User> {
    const user = await this.getByFingerprint(fingerprint);
    if (user) {
      return user;
    }
    return this._userRepository.save({
      fingerprint
    });
  }
}
