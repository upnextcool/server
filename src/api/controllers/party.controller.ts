/**
 * Copyright (c) 2021, Ethan Elliott
 */

import { environment } from '@UpNext/environment';
import { QRService } from '@UpNext/services';
import { ContentType, Controller, Get, QueryParam } from 'routing-controllers';

@Controller('/party')
export class PartyController {
  constructor(private readonly _qrService: QRService) {}

  @Get('/qr.png')
  @ContentType('image/png')
  async shareQRCode(
    @QueryParam('code') code: string,
    @QueryParam('back') back: string,
    @QueryParam('front') front: string
  ): Promise<Buffer> {
    const data = await this._qrService.generateFrom(
      `${environment.front.url}/join?c=${code}`, `#${front}ff`, `#${back}ff`
    );
    return Buffer.from(
      data.split(',')[1], 'base64'
    );
  }
}
