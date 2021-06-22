/**
 * Copyright (c) 2021, Ethan Elliott
 */
import { Context } from '@UpNext/types';

export const authChecker = ({ context }: {context: Context}): boolean => !!context.member;
