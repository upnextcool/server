/**
 * Copyright (c) 2021, Ethan Elliott
 */

import { Party } from '@UpNext/models/party';
import { Type } from 'class-transformer';
import { IsDate, IsObject, IsString, IsUrl, IsUUID, ValidateNested } from 'class-validator';
import { Field, ObjectType } from 'type-graphql';
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
}
