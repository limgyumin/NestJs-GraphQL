import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePostDTO } from './model/createPost.dto';
import { PostDTO } from './model/post.dto';
import { UpdatePostDTO } from './model/updatePost.dto';
import { Post } from './post.entity';
import { PostRepository } from './post.repository';

@Injectable()
export class PostService {
  constructor(private readonly postRepository: PostRepository) {}

  async createPost(createPostDTO: CreatePostDTO): Promise<PostDTO> {
    const post = this.postRepository.create(createPostDTO);

    post.title = createPostDTO.title;
    post.description = createPostDTO.description;
    post.content = createPostDTO.content;

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

  async updatePost(
    idx: number,
    updatePostDTO: UpdatePostDTO,
  ): Promise<PostDTO> {
    const post = await this.postRepository.findByPostIdxByIsDeleted(idx, false);

    if (!post) {
      throw new HttpException(
        {
          message: '존재하지 않는 글.',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    post.title = updatePostDTO.title;
    post.description = updatePostDTO.description;
    post.content = updatePostDTO.content;
    post.updated_at = new Date();

    return await this.postRepository.save(post);
  }

  async deletePost(idx: number): Promise<PostDTO> {
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
