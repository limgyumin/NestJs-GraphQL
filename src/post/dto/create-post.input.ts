import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreatePostInput {
  @Field(() => String)
  readonly title: string;

  @Field(() => String)
  readonly description: string;

  @Field(() => String)
  readonly content: string;
}
