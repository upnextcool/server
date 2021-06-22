/**
 * Copyright (c) 2021, Ethan Elliott
 */

import { Followers, Image } from './';

export interface PrivateUser {
    country: string;
    display_name: string;
    email: string;
    external_urls: any;
    followers: Followers;
    href: string;
    id: string;
    images: Array<Image>;
    product: string;
    type: string;
    uri: string;
}
