/**
 * Copyright (c) 2021, Ethan Elliott
 */

import { PlaylistHistory } from '@UpNext/models';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(PlaylistHistory)
export class PlaylistHistoryRepository extends Repository<PlaylistHistory> {}
