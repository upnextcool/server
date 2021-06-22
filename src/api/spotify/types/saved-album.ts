/**
 * Copyright (c) 2021, Ethan Elliott
 */

import { Album } from './';

export interface SavedAlbum {
    added_at: Record<string, unknown>;
    album: Album;
}
