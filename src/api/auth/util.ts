/**
 * Copyright (c) 2021, Ethan Elliott
 */

import { Member, Party, User } from '@UpNext/models';
import { MemberService, TokenService } from '@UpNext/services';
import { AccessToken } from '@UpNext/types';
import { plainToClass } from 'class-transformer';
import { Container } from 'typedi';

const invalidState = {
  member: undefined,
  party: undefined,
  user: undefined,
};

export interface StateFromToken {
  user: User;
  member: Member;
  party: Party
}

export const validateTokenAndGetState: (token: string) => Promise<StateFromToken> = async token => {
  if (!token) {
    return invalidState;
  }
  try {
    const tokenService: TokenService = Container.get(TokenService);
    const memberService: MemberService = Container.get(MemberService);
    const { memberId } = tokenService.verify<AccessToken>(token);
    const member = await memberService.getById(memberId);
    const user = await memberService.getUserFor(member);
    const party = await memberService.getPartyFor(member);
    if (!member) {
      throw new Error('Invalid token');
    }
    return member ? {
      member: plainToClass(
        Member, member
      ),
      party: plainToClass(
        Party, party
      ),
      user: plainToClass(
        User, user
      ),
    } : invalidState;
  } catch {
    return invalidState;
  }
};
