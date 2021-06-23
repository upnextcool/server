/**
 * Copyright (c) 2021, Ethan Elliott
 */

import { ActiveAuth, Member, PlaylistEntry, PlaylistHistory, SpotifyAccount } from '@UpNext/models';
import { Type } from 'class-transformer';
import { IsArray, IsDate, IsNotEmpty, IsObject, IsString, IsUUID, ValidateNested } from 'class-validator';
import { Field, ObjectType } from 'type-graphql';
import { Column, CreateDateColumn, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType({
  description: 'The party!',
})
@Entity()
export class Party {
  @IsUUID()
  @PrimaryGeneratedColumn('uuid')
  @Field({ description: 'The ID of party' })
  id: string;

  @IsString()
  @IsNotEmpty()
  @Column()
  @Field({ description: 'The name of the party' })
  name: string;

  @IsString()
  @IsNotEmpty()
  @Column()
  @Field({ description: 'The 4-digit code of the party' })
  code: string;

  @IsDate()
  @CreateDateColumn({ type: 'timestamptz' })
  @Field({ description: 'The date when the party was created' })
  createdAt: Date;

  @IsString()
  @IsNotEmpty()
  @Column()
  @Field({ description: 'The spotify playlist ID of the party' })
  spotifyPlaylistId: string;

  @Type(() => Member)
  @IsArray()
  @ValidateNested()
  @OneToMany(
    () => Member, member => member.party, { cascade: true }
  )
  @Field(
    () => [ Member ], { description: 'The party members' }
  )
  members: Array<Member>;

  @Type(() => SpotifyAccount)
  @IsObject()
  @ValidateNested()
  @OneToOne(
    () => SpotifyAccount, spotifyAccount => spotifyAccount.party, {
      cascade: true,
      nullable: true,
      onDelete: 'CASCADE'
    }
  )
  spotifyAccount: SpotifyAccount;

  @Type(() => PlaylistEntry)
  @IsArray()
  @ValidateNested()
  @OneToMany(
    () => PlaylistEntry, playlistEntry => playlistEntry.party, { cascade: true }
  )
  @Field(
    () => [ PlaylistEntry ], { description: 'The playlist of the party' }
  )
  playlist: Array<PlaylistEntry>;

  @Type(() => PlaylistHistory)
  @IsArray()
  @ValidateNested()
  @OneToMany(
    () => PlaylistHistory, playlistHistory => playlistHistory.party, { cascade: true }
  )
  @Field(
    () => [ PlaylistHistory ], { description: 'The playlist of the party' }
  )
  history: Array<PlaylistHistory>;

  @IsObject()
  @ValidateNested()
  @OneToOne(
    () => ActiveAuth, activeAuth => activeAuth.party, { nullable: true, onDelete: 'CASCADE' }
  )
  activeAuth: ActiveAuth;
}
