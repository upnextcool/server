/**
 * Copyright (c) 2021, Ethan Elliott
 */

import { Member, PlaylistEntry } from '@UpNext/models';
import { VoteTypeEnum } from '@UpNext/types';
import { IsEnum, IsObject, IsUUID, ValidateNested } from 'class-validator';
import { Field, ObjectType } from 'type-graphql';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType({
  description: 'A vote on a playlist entry',
})
@Entity()
export class Vote {
  @IsUUID()
  @PrimaryGeneratedColumn('uuid')
  @Field({ description: 'The ID of vote' })
  id: string;

  @IsObject()
  @ValidateNested()
  @ManyToOne(
    () => Member, member => member.votes, { onDelete: 'CASCADE' }
  )
  @Field(
    () => Member, { description: 'The member who voted' }
  )
  member: Member;

  @IsEnum(VoteTypeEnum)
  @Column(
    'enum', { enum: VoteTypeEnum }
  )
  @Field(
    () => VoteTypeEnum, { description: 'The type of vote' }
  )
  type: VoteTypeEnum;

  @IsObject()
  @ValidateNested()
  @ManyToOne(
    () => PlaylistEntry, playlistEntry => playlistEntry.votes, { onDelete: 'CASCADE' }
  )
  @Field(
    () => PlaylistEntry, { description: 'The entry being voted on' }
  )
  playlistEntry: PlaylistEntry;
}
