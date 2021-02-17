import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PostDTO {
  @Field()
  readonly idx: number;

  @Field()
  readonly title: string;

  @Field()
  readonly description: string;

  @Field()
  readonly content: string;

  @Field()
  readonly is_deleted: boolean;

  @Field()
  readonly created_at: Date;

  @Field()
  readonly updated_at: Date;
}
