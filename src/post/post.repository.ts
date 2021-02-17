import { EntityRepository, Repository } from 'typeorm';
import { Post } from './post.entity';

@EntityRepository(Post)
export class PostRepository extends Repository<Post> {
  findByIsDeletedOrderByCreatedAtDesc(isDeleted: boolean): Promise<Post[]> {
    return this.createQueryBuilder()
      .where('is_deleted = :isDeleted', { isDeleted })
      .orderBy('created_at', 'DESC')
      .getMany();
  }

  findByPostIdx(idx: number): Promise<Post> {
    return this.createQueryBuilder().where('idx = :idx', { idx }).getOne();
  }

  findByPostIdxByIsDeleted(idx: number, isDeleted: boolean): Promise<Post> {
    return this.createQueryBuilder()
      .where('idx = :idx', { idx })
      .andWhere('is_deleted = :isDeleted', { isDeleted })
      .getOne();
  }
}
