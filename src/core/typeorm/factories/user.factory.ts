import { UserRole } from '../../models';
import { define } from 'typeorm-seeding';
import { User } from '../entities';

define(User, () => {
  const name = 'illia';
  const email = 'illiazlobin@gmail.com';
  const password = '123456';
  const role = UserRole.Admin;

  const user = new User();
  user.name = name;
  user.email = email;
  user.password = password;
  user.role = role;

  return user;
});
