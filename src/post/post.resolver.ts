import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PostDTO } from './model/post.dto';
import { CreatePostDTO } from './model/createPost.dto';
import { PostService } from './post.service';
import { UpdatePostDTO } from './model/updatePost.dto';

@Resolver()
export class PostResolver {
  constructor(private readonly postService: PostService) {}

  @Mutation(() => PostDTO)
  async createPost(@Args('postData') data: CreatePostDTO): Promise<PostDTO> {
    return await this.postService.createPost(data);
  }

  @Query(() => PostDTO)
  async getPost(@Args('idx') idx: number): Promise<PostDTO> {
    return await this.postService.getPost(idx);
  }

  @Query(() => [PostDTO])
  async getAllPosts(): Promise<PostDTO[]> {
    return await this.postService.getAllPosts();
  }

  @Mutation(() => PostDTO)
  async updatePost(
    @Args('idx') idx: number,
    @Args('postData') data: UpdatePostDTO,
  ): Promise<PostDTO> {
    return await this.postService.updatePost(idx, data);
  }

  @Mutation(() => PostDTO)
  async deletePost(@Args('idx') idx: number): Promise<PostDTO> {
    return await this.postService.deletePost(idx);
  }
}
