import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UserRepository } from './user.repository';
import { User } from './model/user.model';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(data: CreateUserInput): Promise<User> {
    const user = await this.userRepository.findById(data.id);

    if (user) {
      return user;
    }

    const newUser = this.userRepository.create(data);

    newUser.id = data.id;
    newUser.password = data.password;

    return await this.userRepository.save(newUser);
  }
}
