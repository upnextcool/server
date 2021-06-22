/**
 * Copyright (c) 2021, Ethan Elliott
 */

import { Image } from './';

export interface Category {
    href: string;
    icons: Array<Image>;
    id: string;
    name: string;
}
