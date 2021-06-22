/**
 * Copyright (c) 2021, Ethan Elliott
 */

import { Member, Party, User } from '@UpNext/models';
import { ContainerInstance } from 'typedi';

export interface Context {
  user: User; 
  member: Member;
  party: Party;
  requestId: string;
  container: ContainerInstance;
}
