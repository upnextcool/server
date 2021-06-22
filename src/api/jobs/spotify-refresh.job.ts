/**
 * Copyright (c) 2021, Ethan Elliott
 */

import { Logger } from '@UpNext/logger';
import { PartyService, SpotifyAccountService } from '@UpNext/services';
import { Cron, CronController } from 'cron-decorators';
import dayjs from 'dayjs';
import { Inject } from 'typedi';

const log = new Logger(__filename);

const REFRESH_MINUTE_RANGE = 5;

@CronController('spotify-refresh')
export class SpotifyRefreshJob {
  @Inject()
  private readonly _spotifyAccountService: SpotifyAccountService;

  @Inject()
  private readonly _partyService: PartyService;

  @Cron(
    'refresh-tokens', '*/5 * * * *'
  )
  async refreshTokens(): Promise<void> {
    const parties = await this._partyService.getAll();
    const partiesToBeRefreshed = parties.filter(p => dayjs(p.spotifyAccount.tokenExpire).diff(
      dayjs(), 'minutes'
    ) <= REFRESH_MINUTE_RANGE);
    if (partiesToBeRefreshed.length > 0) {
      log.info(`Refreshing ${partiesToBeRefreshed.length} parties.`);
      await Promise.all(partiesToBeRefreshed.map(async party =>
        this._spotifyAccountService.refreshTokenFor(party)));
    }
  }

  // @Cron(
  //   'update-party-state', '*/2 * * * * *'
  // )
  // async updatePartyState() {
  //   console.log('UPDATE STATE');
  // }
}
