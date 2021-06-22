/**
 * Copyright (c) 2021, Ethan Elliott
 */

import { Member, User } from '@UpNext/models';
import { UserService } from '@UpNext/services';
import { Arg, FieldResolver, Mutation, Query, Resolver, ResolverInterface, Root } from 'type-graphql';
import { Service } from 'typedi';

@Service()
@Resolver(() => User)
export class UserResolver implements ResolverInterface<User> {

  constructor(private readonly _userService: UserService) {}

  @Query(() => [ User ])
  async users(): Promise<Array<User>> {
    return this._userService.getAll();
  }

  @FieldResolver(() => Member)
  async member(@Root() user: User): Promise<Member> {
    return this._userService.getMemberFor(user);
  }

  @Mutation(() => User)
  async registerFingerprint(@Arg('fingerprint') fingerprint: string): Promise<User> {
    return this._userService.newUser(fingerprint);
  }
}
