/**
 * Copyright (c) 2021, Ethan Elliott
 */

import { Paging, Track } from './';

export interface SearchResultTracks {
    tracks: Paging<Track>;
}
