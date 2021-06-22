/**
 * Copyright (c) 2021, Ethan Elliott
 */

import { Image, PlaylistTrack, PublicUser } from './';

export interface Playlist {
    collaborative: boolean;
    external_urls: any;
    href: string;
    id: string;
    images: Array<Image>;
    name: string;
    owner: PublicUser;
    public: boolean;
    snapshot_id: string;
    tracks: Array<PlaylistTrack>;
    type: string;
    uri: string;
}
