import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field(() => String)
  readonly id: string;

  @Field(() => String)
  readonly password: string;
}
