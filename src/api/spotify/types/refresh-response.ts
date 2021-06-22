/**
 * Copyright (c) 2021, Ethan Elliott
 */

export interface RefreshResponse {
    access_token: string;
    expires_in: number;
    token_type: string;
    scope: string;
}
