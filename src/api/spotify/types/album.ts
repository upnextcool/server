/**
 * Copyright (c) 2021, Ethan Elliott
 */

import { Artist, Copyright, ExternalId, Image, Paging, SimplifiedTrack } from './';

export interface Album {
    album_type: string;
    artists: Array<Artist>;
    available_markets: Array<string>;
    copyrights: Array<Copyright>;
    external_ids: ExternalId;
    external_urls: Object;
    genres: Array<string>;
    href: string;
    id: string;
    images: Array<Image>;
    label: string;
    name: string;
    popularity: number;
    release_date: string;
    release_date_precision: string;
    tracks: Paging<SimplifiedTrack>;
    type: string;
    uri: string;
}
