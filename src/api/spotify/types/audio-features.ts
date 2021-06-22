/**
 * Copyright (c) 2021, Ethan Elliott
 */

export interface AudioFeaturesObject {
    acousticness: number;
    analysis_url: string;
    danceability: number;
    duration_ms: number;
    energy: number;
    id: string;
    instrumentalness: number;
    key: number;
    liveness: number;
    loudness: number;
    mode: number;
    speechiness: number;
    tempo: number;
    time_signature: number;
    track_ref: string;
    type: string;
    uri: string;
    valence: number;
}
