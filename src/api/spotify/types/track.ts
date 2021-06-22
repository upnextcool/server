/**
 * Copyright (c) 2021, Ethan Elliott
 */

import { Artist, ExternalId, SimplifiedAlbum } from './';

export interface Track {
    album: SimplifiedAlbum;
    artists: Array<Artist>;
    available_markets: Array<string>;
    disc_number: number;
    duration_ms: number;
    explicit: boolean;
    external_ids: ExternalId;
    external_urls: any;
    href: string;
    id: string;
    is_playable: boolean;
    linked_from: Track;
    restrictions: Record<string, unknown>;
    name: string;
    popularity: number;
    preview_url: string;
    track_number: number;
    type: string;
    uri: string;
}
