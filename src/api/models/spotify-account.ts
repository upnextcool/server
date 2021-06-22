/**
 * Copyright (c) 2021, Ethan Elliott
 */

import { Party } from '@UpNext/models';
import { IsDate, IsObject, IsString, IsUUID, ValidateNested } from 'class-validator';
import { Field, ObjectType } from 'type-graphql';
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType({
  description: 'The user being controlled by the party',
})
@Entity()
export class SpotifyAccount {
  @IsUUID()
  @PrimaryGeneratedColumn('uuid')
  @Field({ description: 'The ID of account' })
  id: string;

  @IsString()
  @Column()
  @Field({ description: 'The spotify token' })
  token: string;

  @IsString()
  @Column()
  @Field({ description: 'The spotify refresh token' })
  refreshToken: string;

  @IsDate()
  @Column({ type: 'timestamptz' })
  @Field({ description: 'The spotify token expiration' })
  tokenExpire: Date;

  @IsString()
  @Column()
  @Field({ description: 'The spotify user ID of the account' })
  spotifyUserId: string;

  @IsObject()
  @ValidateNested()
  @OneToOne(
    () => Party, party => party.spotifyAccount, { onDelete: 'CASCADE' }
  )
  @JoinColumn()
  @Field(
    () => Party, { description: 'The party controlling the user' }
  )
  party: Party;
}
