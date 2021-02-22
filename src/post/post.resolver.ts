import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreatePostInput } from './dto/create-post.input';
import { PostService } from './post.service';
import { UpdatePostInput } from './dto/update-post.input';
import { Post } from './model/post.model';

@Resolver()
export class PostResolver {
  constructor(private readonly postService: PostService) {}

  @Mutation(() => Post)
  async createPost(@Args('postData') data: CreatePostInput): Promise<Post> {
    return await this.postService.createPost(data);
  }

  @Query(() => Post)
  async getPost(@Args('idx') idx: number): Promise<Post> {
    return await this.postService.getPost(idx);
  }

  @Query(() => [Post])
  async getAllPosts(): Promise<Post[]> {
    return await this.postService.getAllPosts();
  }

  @Mutation(() => Post)
  async updatePost(
    @Args('idx') idx: number,
    @Args('postData') data: UpdatePostInput,
  ): Promise<Post> {
    return await this.postService.updatePost(idx, data);
  }

  @Mutation(() => Post)
  async deletePost(@Args('idx') idx: number): Promise<Post> {
    return await this.postService.deletePost(idx);
  }
}
