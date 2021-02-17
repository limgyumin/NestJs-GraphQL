import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('post')
export class Post {
  @PrimaryGeneratedColumn()
  idx: number;

  @Column({
    length: 255,
    nullable: false,
  })
  title: string;

  @Column({
    length: 255,
    nullable: true,
  })
  description: string;

  @Column('text', {
    nullable: false,
  })
  content: string;

  @Column({
    default: false,
    nullable: false,
  })
  is_deleted: boolean;

  @Column('timestamptz')
  @CreateDateColumn()
  created_at: Date;

  @Column('timestamptz')
  @CreateDateColumn()
  updated_at: Date;
}
