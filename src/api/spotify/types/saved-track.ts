/**
 * Copyright (c) 2021, Ethan Elliott
 */

import { Track } from './';

export interface SavedTrack {
    added_at: Record<string, unknown>;
    track: Track;
}
