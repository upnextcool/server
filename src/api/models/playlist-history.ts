/**
 * Copyright (c) 2021, Ethan Elliott
 */

import { Member } from '@UpNext/models/member';
import { Party } from '@UpNext/models/party';
import { Type } from 'class-transformer';
import { IsDate, IsNumber, IsObject, IsString, IsUrl, IsUUID, ValidateNested } from 'class-validator';
import { Field, Int, ObjectType } from 'type-graphql';
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType({
  description: 'A song that has played at the party',
})
@Entity()
export class PlaylistHistory {
  @IsUUID()
  @PrimaryGeneratedColumn('uuid')
  @Field({ description: 'The ID of entry' })
  id: string;

  @IsDate()
  @CreateDateColumn({ type: 'timestamptz' })
  @Field({ description: 'The date when the song was added' })
  playedAt: Date;

  @IsString()
  @Column()
  @Field({ description: 'The name of the song' })
  name: string;

  @IsString()
  @Column()
  @Field({ description: 'The artist of the song' })
  artist: string;

  @IsUrl()
  @Column()
  @Field({ description: 'The url of the albumArtwork for the song' })
  albumArtwork: string;

  @IsString()
  @Column()
  @Field({ description: 'The spotifyId of the song' })
  spotifyId: string;

  @Type(() => Member)
  @IsObject()
  @ValidateNested()
  @ManyToOne(
    () => Member, member => member.playlistEntries, { onDelete: 'CASCADE' }
  )
  @Field(
    () => Member, { description: 'The member who added the song' }
  )
  addedBy: Member;

  @Type(() => Party)
  @IsObject()
  @ValidateNested()
  @ManyToOne(
    () => Party, party => party.history, { onDelete: 'CASCADE' }
  )
  @Field(
    () => Party, { description: 'The party that the song was played at' }
  )
  party: Party;

  @IsNumber()
  @Column()
  @Field(
    () => Int,
    { description: 'The final score of the song' }
  )
  score: number;
}
