/**
 * Copyright (c) 2021, Ethan Elliott
 */

import { Followers, Image } from './';

export interface Artist {
    external_urls: Object;
    followers: Followers;
    genres: Array<string>;
    href: string;
    id: string;
    images: Array<Image>;
    name: string;
    popularity: number;
    type: string;
    uri: string;
}
