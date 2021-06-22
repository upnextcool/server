/**
 * Copyright (c) 2021, Ethan Elliott
 */

import { registerEnumType } from 'type-graphql';

export enum VoteTypeEnum {
  UP_VOTE,
  DOWN_VOTE,
}

registerEnumType(
  VoteTypeEnum, {
    description: 'The type of vote',
    name: 'VoteEnum',
  }
);
