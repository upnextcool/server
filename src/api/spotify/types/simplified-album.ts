/**
 * Copyright (c) 2021, Ethan Elliott
 */

import { Image, SimplifiedArtist } from './';

export interface SimplifiedAlbum {
    album_group: string;
    album_type: string;
    artists: Array<SimplifiedArtist>;
    available_markets: Array<string>;
    external_urls: any;
    href: string;
    id: string;
    images: Array<Image>;
    name: string;
    type: string;
    uri: string;
}
