/**
 * Copyright (c) 2021, Ethan Elliott
 */

import { registerEnumType } from 'type-graphql';

export enum PartyStateEnum {
  NEW_SONG,
  PLAYING,
  NOTHING_PLAYING,
  PAUSED,
  NEXT_FROM_QUEUE
}

registerEnumType(
  PartyStateEnum, {
    description: 'The playback state as tracked by upnext',
    name: 'PartyStateEnum',
  }
);
