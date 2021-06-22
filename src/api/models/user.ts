/**
 * Copyright (c) 2021, Ethan Elliott
 */

import { ActiveAuth, Member } from '@UpNext/models';
import { IsObject, IsString, IsUUID, ValidateNested } from 'class-validator';
import { Field, ObjectType } from 'type-graphql';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType({
  description: 'A user helps dampen spam by tracking fingerprints',
})
@Entity()
export class User {
  @IsUUID()
  @PrimaryGeneratedColumn('uuid')
  @Field({ description: 'The ID of user' })
  id: string;

  @IsString()
  @Column()
  @Field({ description: 'fingerprint of the user' })
  fingerprint: string;

  @IsObject()
  @ValidateNested()
  @OneToOne(
    () => Member, member => member.user, { nullable: true, onDelete: 'CASCADE' }
  )
  @Field(
    () => Member, { description: 'The membership of a user', nullable: true }
  )
  member: Member;

  @IsObject()
  @ValidateNested()
  @OneToOne(
    () => ActiveAuth, activeAuth => activeAuth.user, { nullable: true, onDelete: 'CASCADE' }
  )
  activeAuth: ActiveAuth;
}
