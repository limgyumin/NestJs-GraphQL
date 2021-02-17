import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreatePostDTO {
  @Field()
  readonly title: string;

  @Field()
  readonly description: string;

  @Field()
  readonly content: string;
}
