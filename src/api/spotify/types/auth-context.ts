/**
 * Copyright (c) 2021, Ethan Elliott
 */

export interface AuthContext {
    scope: string;
    token_type: string;
    expires_in: number;
    refresh_token: string;
    access_token: string;

}
