import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from 'src/user/model/user.model';
import { UserRepository } from 'src/user/user.repository';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { Post } from './model/post.model';
import { PostRepository } from './post.repository';

@Injectable()
export class PostService {
  constructor(
    private readonly postRepository: PostRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async createPost(data: CreatePostInput, user: User): Promise<Post> {
    const post = this.postRepository.create(data);

    post.title = data.title;
    post.description = data.description;
    post.content = data.content;
    post.user = user;

    return await this.postRepository.save(post);
  }

  async getPost(idx: number): Promise<Post> {
    const post = await this.postRepository.findByPostIdxByIsDeleted(idx, false);

    if (!post) {
      throw new HttpException(
        {
          message: '존재하지 않는 글.',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    const user = await this.userRepository.findByUserIdx(post.fk_user_idx);
    post.user = user;

    return post;
  }

  async getAllPosts(): Promise<Post[]> {
    const posts = await this.postRepository.findByIsDeletedOrderByCreatedAtDesc(
      false,
    );

    for (let i in posts) {
      const post = posts[i];
      const user = await this.userRepository.findByUserIdx(post.fk_user_idx);

      post.user = user;
    }

    return posts;
  }

  async updatePost(idx: number, data: UpdatePostInput): Promise<Post> {
    const post = await this.postRepository.findByPostIdxByIsDeleted(idx, false);

    if (!post) {
      throw new HttpException(
        {
          message: '존재하지 않는 글.',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    post.title = data.title;
    post.description = data.description;
    post.content = data.content;
    post.updated_at = new Date();

    return await this.postRepository.save(post);
  }

  async deletePost(idx: number): Promise<Post> {
    const post = await this.postRepository.findByPostIdxByIsDeleted(idx, false);

    if (!post) {
      throw new HttpException(
        {
          message: '존재하지 않는 글.',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    post.is_deleted = true;

    return await this.postRepository.save(post);
  }
}
