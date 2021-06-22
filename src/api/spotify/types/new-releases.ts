/**
 * Copyright (c) 2021, Ethan Elliott
 */

import { Paging, SimplifiedAlbum } from './';

export interface NewReleases {
    message: string;
    albums: Paging<SimplifiedAlbum>;
}
