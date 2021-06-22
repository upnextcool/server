/**
 * Copyright (c) 2021, Ethan Elliott
 */

import { LinkedTrack, SimplifiedArtist } from './';

export interface SimplifiedTrack {
    artists: Array<SimplifiedArtist>;
    available_markets: Array<string>;
    disc_number: number;
    duration_ms: number;
    explicit: boolean;
    external_urls: any;
    href: string;
    id: string;
    is_playable: boolean;
    linked_from: LinkedTrack;
    name: string;
    preview_url: string;
    track_number: number;
    type: string;
    uri: string;
}
