/**
 * Copyright (c) 2021, Ethan Elliott
 */

import { Party, User } from '@UpNext/models';
import { Type } from 'class-transformer';
import { IsDate, IsObject, IsUUID, ValidateNested } from 'class-validator';
import { ObjectType } from 'type-graphql';
import { CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType({
  description: 'An active authentication session reference.',
})
@Entity()
export class ActiveAuth {
  @IsUUID()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @IsDate()
  @CreateDateColumn({ type: 'timestamptz' })
  startedAt: Date;

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
  user: User;

  @Type(() => Party)
  @IsObject()
  @ValidateNested()
  @ManyToOne(
    () => Party, party => party.activeAuth, { onDelete: 'CASCADE' }
  )
  party: Party;
}
