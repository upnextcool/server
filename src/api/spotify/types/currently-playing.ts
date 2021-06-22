/**
 * Copyright (c) 2021, Ethan Elliott
 */

import { Context, Device, Track } from './';

export interface CurrentlyPlaying {
    device: Device;
    repeat_state: string;
    shuffle_state: boolean;
    context: Context;
    timestamp: number;
    progress_ms: number;
    is_playing: boolean;
    item: Track;
    currently_playing_type: string;
    actions: Record<string, unknown>;
}
