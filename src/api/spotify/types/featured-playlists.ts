/**
 * Copyright (c) 2021, Ethan Elliott
 */

import { Paging, SimplifiedPlaylist } from './';

export interface FeaturedPlaylists {
     message: string;
     playlists: Paging<SimplifiedPlaylist>;
}
