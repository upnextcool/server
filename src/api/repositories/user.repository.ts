/**
 * Copyright (c) 2021, Ethan Elliott
 */

import { User } from '@UpNext/models';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(User)
export class UserRepository extends Repository<User> {}
