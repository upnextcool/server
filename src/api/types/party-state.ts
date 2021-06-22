/**
 * Copyright (c) 2021, Ethan Elliott
 */

export interface ArtworkPalette {
  vibrant: string;
  muted: string;
  darkVibrant: string;
  darkMuted: string;
  lightVibrant: string;
  lightMuted: string;
}

export interface PartyState {
  progress?: number;
  duration?: number;
  name?: string;
  artist?: string;
  spotifyId?: string;
  artwork?: string;
  playing?: boolean;
  palette?: ArtworkPalette;
}
