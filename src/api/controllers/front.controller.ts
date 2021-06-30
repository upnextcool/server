/**
 * Copyright (c) 2021, Ethan Elliott
 */

import { environment } from '@UpNext/environment';
import { Controller, Get } from 'routing-controllers';

@Controller('/front')
export class FrontController {
  @Get('/config')
  async config(): Promise<Record<string, unknown>> {
    return {
      version: environment.front.version,
    };
  }
}
