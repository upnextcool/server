/**
 * Copyright (c) 2021, Ethan Elliott
 */

import { Artist, Paging } from './';

export interface SearchResultArtists {
    artists: Paging<Artist>;
}
