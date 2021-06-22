/**
 * Copyright (c) 2021, Ethan Elliott
 */

import { Followers, Image } from './';

export interface PublicUser {
    display_name: string;
    external_urls: any;
    followers: Followers;
    href: string;
    id: string;
    images: Array<Image>;
    type: string;
    uri: string;
}
