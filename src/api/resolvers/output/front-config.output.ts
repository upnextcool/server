/**
 * Copyright (c) 2021, Ethan Elliott
 */

import { Field, Int, ObjectType } from 'type-graphql';

@ObjectType({
  description: 'FrontConfigOutput',
})
export class FrontConfigOutput {
  @Field(() => Int)
  version: number;
}
