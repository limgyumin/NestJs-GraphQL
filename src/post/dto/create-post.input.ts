import { Field, InputType } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';

@InputType()
export class CreatePostInput {
  @Field(() => String)
  readonly title: string;

  @Field(() => String)
  readonly description: string;

  @Field(() => String)
  readonly content: string;
}
