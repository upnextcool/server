/**
 * Copyright (c) 2021, Ethan Elliott
 */

import { Context, SimplifiedTrack } from './';

export interface PlayHistory {
    track: SimplifiedTrack;
    played_at: Record<string, unknown>;
    context: Context;
}
