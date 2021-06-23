/**
 * Copyright (c) 2021, Ethan Elliott
 */

import { Party, PlaylistEntry, User, Vote } from '@UpNext/models';
import { Type } from 'class-transformer';
import { IsArray, IsDate, IsInt, IsNotEmpty, IsObject, IsString, IsUUID, ValidateNested } from 'class-validator';
import { Field, Int, ObjectType } from 'type-graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@ObjectType({
  description: 'A member links a user to a party',
})
@Entity()
export class Member {
  @IsUUID()
  @PrimaryGeneratedColumn('uuid')
  @Field({ description: 'The ID of member' })
  id: string;
  
  @IsDate()
  @CreateDateColumn({ type: 'timestamptz' })
  @Field({ description: 'The date of when the member joined the party' })
  joinedAt: Date;

  @IsString()
  @IsNotEmpty()
  @Column()
  @Field({ description: 'The username of the member' })
  username: string;

  @Type(() => User)
  @IsObject()
  @ValidateNested()
  @JoinColumn()
  @OneToOne(
    () => User, user => user.member, {
      cascade: true,
      onDelete: 'CASCADE',
    }
  )
  @Field(
    () => User, { description: 'The user map of the member' }
  )
  user: User;

  @Type(() => Party)
  @IsObject()
  @ValidateNested()
  @ManyToOne(
    () => Party, party => party.members, { onDelete: 'CASCADE' }
  )
  @Field(
    () => Party, { description: 'The party that the member has joined' }
  )
  party: Party;
  
  @IsInt()
  @Column({ default: 0 })
  @Field(
    () => Int, { defaultValue: 0, description: 'The score of the member' }
  )
  score: number;

  @Type(() => Vote)
  @IsArray()
  @ValidateNested()
  @OneToMany(
    () => Vote, vote => vote.member, { cascade: true }
  )
  @Field(
    () => [ Vote ], { description: 'The Votes of the member' }
  )
  votes: Array<Vote>;

  @Type(() => PlaylistEntry)
  @IsArray()
  @ValidateNested()
  @OneToMany(
    () => PlaylistEntry, playlistEntry => playlistEntry.addedBy, { cascade: true }
  )
  @Field(
    () => [ PlaylistEntry ], { description: 'The playlist entries of the member' }
  )
  playlistEntries: Array<PlaylistEntry>;
}
