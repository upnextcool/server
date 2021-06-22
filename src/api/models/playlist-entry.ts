/**
 * Copyright (c) 2021, Ethan Elliott
 */

import { Member } from '@UpNext/models/member';
import { Party } from '@UpNext/models/party';
import { Vote } from '@UpNext/models/vote';
import { Type } from 'class-transformer';
import { IsArray, IsDate, IsObject, IsString, IsUrl, IsUUID, ValidateNested } from 'class-validator';
import { Field, ObjectType } from 'type-graphql';
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType({
  description: 'A song to be played at the party',
})
@Entity()
export class PlaylistEntry {
  @IsUUID()
  @PrimaryGeneratedColumn('uuid')
  @Field({ description: 'The ID of entry' })
  id: string;

  @IsDate()
  @CreateDateColumn({ type: 'timestamptz' })
  @Field({ description: 'The date when the song was added' })
  addedAt: Date;

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
    () => Party, party => party.playlist, { onDelete: 'CASCADE' }
  )
  @Field(
    () => Party, { description: 'The party that the song was added to' }
  )
  party: Party;


  @Type(() => Vote)
  @IsArray()
  @ValidateNested()
  @OneToMany(
    () => Vote, vote => vote.playlistEntry, { cascade: true }
  )
  @Field(
    () => [ Vote ], { description: 'The Votes on the playlist entry' }
  )
  votes: Array<Vote>;
}
