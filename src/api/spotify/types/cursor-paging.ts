/**
 * Copyright (c) 2021, Ethan Elliott
 */

import { Cursor } from './';

export interface CursorPaging {
    href: string;
    items: Array<Map<string, unknown>>;
    limit: number;
    next: string;
    cursors: Cursor;
    total: number;
}
