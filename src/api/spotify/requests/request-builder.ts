/**
 * Copyright (c) 2021, Ethan Elliott
 */

import { HttpMethods } from '../types';
import { Request } from './request';

export class RequestBuilder {
  method: HttpMethods;

  host: string;

  scheme: string;

  path: string;

  headers: Record<string, unknown>;

  queryParameters: Record<string, unknown>;

  bodyParameters: Record<string, unknown>;

  public static builder(): RequestBuilder {
    return new RequestBuilder();
  }

  public withMethod(method: HttpMethods): RequestBuilder {
    // eslint-disable-next-line immutable/no-mutation
    this.method = method;
    return this;
  }

  public withHost(host: string): RequestBuilder {
    // eslint-disable-next-line immutable/no-mutation
    this.host = host;
    return this;
  }

  public withScheme(scheme: string): RequestBuilder {
    // eslint-disable-next-line immutable/no-mutation
    this.scheme = scheme;
    return this;
  }

  public withPath(path: string): RequestBuilder {
    // eslint-disable-next-line immutable/no-mutation
    this.path = path;
    return this;
  }

  public withQueryParameters(queryParameters: Record<string, unknown>): RequestBuilder {
    // eslint-disable-next-line immutable/no-mutation
    this.queryParameters = queryParameters;
    return this;
  }

  public withBodyParameters(bodyParameters: Record<string, unknown>): RequestBuilder {
    // eslint-disable-next-line immutable/no-mutation
    this.bodyParameters = bodyParameters;
    return this;
  }

  public withHeaders(headers: Record<string, unknown>): RequestBuilder {
    // eslint-disable-next-line immutable/no-mutation
    this.headers = headers;
    return this;
  }

  public withAuth(token: string): RequestBuilder {
    if (!this.headers) {
      // eslint-disable-next-line immutable/no-mutation
      this.headers = {};
    }
    // eslint-disable-next-line immutable/no-mutation
    this.headers.Authorization = `Bearer ${token}`;
    return this;
  }

  public build(): Request {
    return new Request(this);
  }
}
