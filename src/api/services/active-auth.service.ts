/**
 * Copyright (c) 2021, Ethan Elliott
 */

import { ActiveAuth, Party, User } from '@UpNext/models';
import { ActiveAuthRepository } from '@UpNext/repositories';
import { Service } from 'typedi';
import { OrmRepository } from 'typeorm-typedi-extensions';

@Service()
export class ActiveAuthService {

  constructor(@OrmRepository() private readonly _activeAuthRepository: ActiveAuthRepository) {}

  async getByUser(user: User): Promise<ActiveAuth> {
    return this._activeAuthRepository.findOne({
      where: {
        user
      }
    });
  }
  
  async startNewAuth(
    user: User, 
    party: Party
  ): Promise<ActiveAuth> {
    const active = await this.getByUser(user);
    if (active) {
      return active;
    }
    
    return this._activeAuthRepository.save({
      party,
      user
    });
  }

  async getById(authId: string): Promise<ActiveAuth> {
    return this._activeAuthRepository.findOne({
      relations: [
        'party',
        'user' 
      ],
      where: {
        id: authId
      }
    });
  }

  async remove(activeAuth: ActiveAuth): Promise<void> {
    await this._activeAuthRepository.remove(activeAuth);
  }
}
