/**
 * Copyright (c) 2021, Ethan Elliott
 */

import { Artist, Paging, SimplifiedAlbum, SimplifiedPlaylist, Track } from './';

export interface SearchResultAll {
    artists: Paging<Artist>;
    albums: Paging<SimplifiedAlbum>;
    tracks: Paging<Track>;
    playlists: Paging<SimplifiedPlaylist>;
}
