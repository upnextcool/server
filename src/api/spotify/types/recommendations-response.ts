/**
 * Copyright (c) 2021, Ethan Elliott
 */

import { RecommendationSeed, SimplifiedTrack } from './';

export interface RecommendationsResponse {
    seeds: Array<RecommendationSeed>;
    tracks: Array<SimplifiedTrack>;
}
