import { Field, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@ObjectType()
@Entity('user')
export class User {
  @Field(() => Number)
  @PrimaryGeneratedColumn()
  idx: number;

  @Field(() => String)
  @Column({
    length: 255,
    nullable: false,
  })
  id: string;

  @Field(() => String)
  @Column({
    length: 255,
    nullable: false,
  })
  password: string;

  @Field(() => Boolean)
  @Column({
    default: false,
    nullable: false,
  })
  is_admin: boolean;

  @Field(() => Date)
  @Column('timestamptz')
  @CreateDateColumn()
  created_at: Date;
}
