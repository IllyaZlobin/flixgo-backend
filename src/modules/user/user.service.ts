import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../core/typeorm';
import { Like, Repository } from 'typeorm';
import { UserRegistrationRequest } from './dto/registration/userRegistration.request';
import { ValidationException } from '../../core/nest';

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

  async registration(model: UserRegistrationRequest): Promise<User> {
    const { email, password, username, firstname, lastname } = model;

    await this.checkEmailExist(email);
    await this.checkUsernameExist(username);

    const user = await this._userRepository.save(
      new User(email, password, username, firstname, lastname),
    );

    return user;
  }

  private async checkEmailExist(email: string): Promise<User> {
    const result = await this._userRepository.findOne({
      where: {
        email,
      },
    });

    if (result) {
      throw new ValidationException('Email is already exist');
    }

    return result;
  }

  private async checkUsernameExist(userName: string): Promise<User> {
    const result = await this._userRepository.findOne({
      where: {
        userName,
      },
    });

    if (result) {
      throw new ValidationException('Username is already exist');
    }

    return result;
  }
}
