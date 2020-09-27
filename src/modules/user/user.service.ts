import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../core/typeorm';
import { Like, Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly _userRepository: Repository<User>,
  ) {}

  async findByEmail(email: string) {
    const user = await this._userRepository.findOne({
      where: { email: Like(email) },
    });

    return user;
  }

  async findById(id: number): Promise<User> {
    const user = await this._userRepository.findOne(id);

    return user;
  }
}
