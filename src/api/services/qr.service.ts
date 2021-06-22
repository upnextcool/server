/**
 * Copyright (c) 2021, Ethan Elliott
 */

import QRCode from 'qrcode';
import { Service } from 'typedi';

@Service()
export class QRService {

  public async generateFrom(
    data: string, dark: string, light: string
  ): Promise<string> {
    return QRCode.toDataURL(
      data, { color: { dark, light }, errorCorrectionLevel: 'H' }
    );
  }

}
