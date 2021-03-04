import { Field, ObjectType } from '@nestjs/graphql';
import { User } from 'src/user/model/user.model';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
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

  @Field(() => User)
  @ManyToOne(() => User, { onDelete: 'SET NULL', cascade: true })
  @JoinColumn({ name: 'fk_user_idx' })
  user: User;

  @Field(() => Number)
  @Column({ nullable: true })
  fk_user_idx: number;

  @Field(() => Date)
  @Column('timestamptz')
  @CreateDateColumn()
  created_at: Date;

  @Field(() => Date)
  @Column('timestamptz')
  @CreateDateColumn()
  updated_at: Date;
}
