/**
 * Copyright (c) 2021, Ethan Elliott
 */

import { Paging, SimplifiedPlaylist } from './';

export interface SearchResultPlaylists {
    playlists: Paging<SimplifiedPlaylist>;
}
