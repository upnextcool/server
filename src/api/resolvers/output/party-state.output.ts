/**
 * Copyright (c) 2021, Ethan Elliott
 */

import { ArtworkPaletteOutput } from '@UpNext/resolvers/output/artwork-palette.output';
import { PartyState } from '@UpNext/types';
import { Field, Int, ObjectType } from 'type-graphql';

@ObjectType({
  description: 'PartyStateOutput',
})
export class PartyStateOutput implements PartyState {
  @Field({ nullable: true })
  name?: string;

  @Field(
    () => Int, { nullable: true }
  )
  progress?: number;

  @Field(
    () => Int, { nullable: true }
  )
  duration?: number;

  @Field({ nullable: true })
  playing?: boolean;

  @Field({ nullable: true })
  spotifyId?: string;

  @Field({ nullable: true })
  artwork?: string;

  @Field({ nullable: true })
  artist?: string;

  @Field(
    () => ArtworkPaletteOutput, { nullable: true }
  )
  palette?: ArtworkPaletteOutput

}
