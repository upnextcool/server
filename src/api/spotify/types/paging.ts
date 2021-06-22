/**
 * Copyright (c) 2021, Ethan Elliott
 */

export interface Paging<T> {
     items: Array<T>;
     href: string;
     limit: number;
     next: string;
     offset: number;
     previous: string;
     total: number;
}
