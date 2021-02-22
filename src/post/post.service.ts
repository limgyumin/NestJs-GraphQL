import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { Post } from './model/post.model';
import { PostRepository } from './post.repository';

@Injectable()
export class PostService {
  constructor(private readonly postRepository: PostRepository) {}

  async createPost(data: CreatePostInput): Promise<Post> {
    const post = this.postRepository.create(data);

    post.title = data.title;
    post.description = data.description;
    post.content = data.content;

    return await this.postRepository.save(post);
  }

  async getPost(idx: number): Promise<Post> {
    const post = await this.postRepository.findByPostIdxByIsDeleted(idx, false);

    return post;
  }

  async getAllPosts(): Promise<Post[]> {
    const posts = await this.postRepository.findByIsDeletedOrderByCreatedAtDesc(
      false,
    );

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
