/**
 * Copyright (c) 2021, Ethan Elliott
 */

export class GenericError extends Error {
  constructor(
    name: string, message: string, stack: string
  ) {
    super(message);
    // eslint-disable-next-line immutable/no-mutation
    this.name = name;
    // eslint-disable-next-line immutable/no-mutation
    this.stack = stack;
  }
}
