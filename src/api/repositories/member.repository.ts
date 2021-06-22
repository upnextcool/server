/**
 * Copyright (c) 2021, Ethan Elliott
 */

import { Member } from '@UpNext/models';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Member)
export class MemberRepository extends Repository<Member> {}
