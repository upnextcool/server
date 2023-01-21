/**
 * Copyright (c) 2021, Ethan Elliott
 */

import { environment } from '@UpNext/environment';
import { AuthService } from '@UpNext/services';
import { Controller, Get, QueryParam, Redirect } from 'routing-controllers';

@Controller('/auth')
export class AuthController {
  constructor(private readonly _authService: AuthService) {}

  @Get('/callback')
  @Redirect(`${environment.front.url}/join?code=:code`)
  async OAuthCallback(
    @QueryParam('code') code: string,
    @QueryParam('state') state: string
  ): Promise<Record<string, string>> {
    const partyCode = await this._authService.oAuthCallback(
      code,
      state
    );

    return {
      code: partyCode
    };
  }
}
