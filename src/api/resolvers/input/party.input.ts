/**
 * Copyright (c) 2021, Ethan Elliott
 */
import { Field, InputType } from 'type-graphql';

@InputType()
export class PartyInput {
  @Field()
  name: string;
}
