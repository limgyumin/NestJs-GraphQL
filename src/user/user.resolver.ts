import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthGuard } from 'src/auth/auth.guard';
import { createToken } from 'src/lib/token';
import { CreateUserInput } from './dto/create-user.input';
import { User } from './model/user.model';
import { UserService } from './user.service';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => User)
  @UseGuards(new AuthGuard())
  me(@Context('user') user: User): User {
    return user;
  }

  @Mutation(() => String)
  async login(@Args('user') data: CreateUserInput): Promise<string> {
    let user = await this.userService.createUser(data);
    return createToken(user);
  }
}
