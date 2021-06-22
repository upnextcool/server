/**
 * Copyright (c) 2021, Ethan Elliott
 */

import { RequestBuilder } from './request-builder';

export class WebApiRequestBuilder {
    private static DEFAULT_HOST = 'api.spotify.com';

    private static DEFAULT_SCHEME = 'https';

    constructor() {}

    public static make(token: string): RequestBuilder {
      return RequestBuilder
        .builder()
        .withHost(this.DEFAULT_HOST)
        .withScheme(this.DEFAULT_SCHEME)
        .withAuth(token);
    }

}
