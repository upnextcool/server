/**
 * Copyright (c) 2021, Ethan Elliott
 */

export interface AuthResponse {
    access_token: string;
    refresh_token: string;
    expires_in: number;
    token_type: string;
    scope: string;
}
