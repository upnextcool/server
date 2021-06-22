/**
 * Copyright (c) 2021, Ethan Elliott
 */

import { WebApiRequestBuilder } from '../requests';
import { HttpMethods, PrivateUser, PublicUser } from '../types';

export class Users {

  public async getCurrent(token: string): Promise<PrivateUser> {
    return WebApiRequestBuilder
      .make(token)
      .withMethod(HttpMethods.GET)
      .withPath('/v1/me')
      .build()
      .execute<PrivateUser>();
  }

  public async getById(
    token: string, userId: string
  ): Promise<PublicUser> {
    return WebApiRequestBuilder
      .make(token)
      .withMethod(HttpMethods.GET)
      .withPath(`/v1/users/${userId}`)
      .build()
      .execute<PublicUser>();
  }
}
