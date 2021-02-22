import { Field, ObjectType } from '@nestjs/graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@ObjectType()
@Entity('post')
export class Post {
  @Field(() => Number)
  @PrimaryGeneratedColumn()
  idx: number;

  @Field(() => String)
  @Column({
    length: 255,
    nullable: false,
  })
  title: string;

  @Field(() => String)
  @Column({
    length: 255,
    nullable: true,
  })
  description: string;

  @Field(() => String)
  @Column('text', {
    nullable: false,
  })
  content: string;

  @Field(() => Boolean, { defaultValue: false })
  @Column({
    default: false,
    nullable: false,
  })
  is_deleted: boolean;

  @Field(() => Date)
  @Column('timestamptz')
  @CreateDateColumn()
  created_at: Date;

  @Field(() => Date)
  @Column('timestamptz')
  @CreateDateColumn()
  updated_at: Date;
}
