/**
 * Copyright (c) 2021, Ethan Elliott
 */

import { Paging, SimplifiedAlbum } from './';

export interface SearchResultAlbums {
    albums: Paging<SimplifiedAlbum>;
}
