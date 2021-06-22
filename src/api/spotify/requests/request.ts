/**
 * Copyright (c) 2021, Ethan Elliott
 */

import axios, { AxiosResponse } from 'axios';

import { GenericError } from '../error';
import { HttpMethods } from '../types';
import { RequestBuilder } from './request-builder';

export class Request {
    private readonly method: HttpMethods;

    private readonly host: string;

    private readonly scheme: string;

    private readonly path: string;

    private readonly headers: Record<string, unknown>;

    private readonly queryParameters: Record<string, unknown>;

    private readonly bodyParameters: Record<string, unknown>;

    constructor(builder: RequestBuilder) {
      // eslint-disable-next-line immutable/no-mutation
      this.method = builder.method;
      // eslint-disable-next-line immutable/no-mutation
      this.host = builder.host;
      // eslint-disable-next-line immutable/no-mutation
      this.scheme = builder.scheme;
      // eslint-disable-next-line immutable/no-mutation
      this.path = builder.path;
      // eslint-disable-next-line immutable/no-mutation
      this.headers = builder.headers;
      // eslint-disable-next-line immutable/no-mutation
      this.queryParameters = builder.queryParameters;
      // eslint-disable-next-line immutable/no-mutation
      this.bodyParameters = builder.bodyParameters;
    }

    public async execute<T>(): Promise<T> {
      try {
        return (await this.makeAxios()).data as T;
      } catch (error) {
        throw new GenericError(
          error.response.data.error.status, error.response.data.error.message, error.stack
        );
      }
    }

    private getURI(): string {
      return `${this.scheme}://${this.host}${this.path}`;
    }

    private makeAxios(): Promise<AxiosResponse> {
      switch (this.method) {
      case HttpMethods.DELETE:
        return axios.request({
          headers: this.headers,
          method: 'delete',
          params: this.queryParameters,
          url: this.getURI()
        });
      case HttpMethods.GET:
        return axios.request({
          headers: this.headers,
          method: 'get',
          params: this.queryParameters,
          url: this.getURI()
        });
      case HttpMethods.POST:
        if (this.bodyParameters) {
          return axios.request({
            data: this.bodyParameters,
            headers: this.headers,
            method: 'post',
            params: this.queryParameters,
            url: this.getURI()
          });
        } 
        return axios.request({
          headers: this.headers,
          method: 'post',
          params: this.queryParameters,
          url: this.getURI()
        });
                
      case HttpMethods.PUT:
        return axios.request({
          data: this.bodyParameters,
          headers: this.headers,
          method: 'put',
          params: this.queryParameters,
          url: this.getURI()
        });
      default:
        throw new Error(`Invalid HTTP method: ${this.method}`);
      }
    }
}
