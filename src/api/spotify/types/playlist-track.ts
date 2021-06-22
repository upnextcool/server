/**
 * Copyright (c) 2021, Ethan Elliott
 */

import { PublicUser, Track } from './';

export interface PlaylistTrack {
    added_at: Record<string, unknown>;
    added_by: PublicUser;
    is_local: boolean;
    track: Track;
}
