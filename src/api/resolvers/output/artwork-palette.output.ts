/**
 * Copyright (c) 2021, Ethan Elliott
 */

import { ArtworkPalette } from '@UpNext/types';
import { Field, ObjectType } from 'type-graphql';

@ObjectType({
  description: 'ArtworkPaletteOutput',
})
export class ArtworkPaletteOutput implements ArtworkPalette {
  @Field()
  vibrant: string;

  @Field()
  muted: string;

  @Field()
  darkVibrant: string;

  @Field()
  darkMuted: string;

  @Field()
  lightVibrant: string;

  @Field()
  lightMuted: string;
}
