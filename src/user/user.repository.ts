import { EntityRepository, Repository } from 'typeorm';
import { User } from './model/user.model';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  findById(id: string): Promise<User> {
    return this.createQueryBuilder().where('id = :id', { id }).getOne();
  }

  findByUserIdx(idx: number): Promise<User> {
    return this.createQueryBuilder().where('idx = :idx', { idx }).getOne();
  }
}
