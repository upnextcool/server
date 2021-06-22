/**
 * Copyright (c) 2021, Ethan Elliott
 */

import { Field, ObjectType } from 'type-graphql';

@ObjectType({
  description: 'FeaturedPlaylistsOutput',
})
export class FeaturedPlaylistsOutput {
  @Field()
  message: string;
}
