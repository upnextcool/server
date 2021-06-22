/**
 * Copyright (c) 2021, Ethan Elliott
 */

import { PartyService, UpNextService } from '@UpNext/services';
import { Cron, CronController } from 'cron-decorators';
import { Inject } from 'typedi';

@CronController('spotify-refresh')
export class PartyStateJob {
  @Inject()
  private readonly _upNextService: UpNextService;


  @Inject()
  private readonly _partyService: PartyService;


  @Cron(
    'update-party-state', '*/1 * * * * *'
  )
  async updatePartyState(): Promise<void> {
    const parties = await this._partyService.getAll();
    const partyStateMap = parties
      .filter(p => p.spotifyAccount)
      .map(async party => this._upNextService.partyLoopStuff(party));
    await Promise.all(partyStateMap);
  }
}
