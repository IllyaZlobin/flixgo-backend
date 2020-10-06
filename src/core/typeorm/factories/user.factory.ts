import { UserRole, UserStatus } from '../../models';
import { define } from 'typeorm-seeding';
import { User } from '../entities';

define(User, () => {
  const name = 'illia';
  const lastName = 'zlobin';
  const userName = 'illiazlobin';
  const status = UserStatus.APPROVED;
  const email = 'illiazlobin@gmail.com';
  const password = '123456';
  const role = UserRole.Admin;

  const user = new User(
    email,
    password,
    userName,
    name,
    lastName,
    status,
    role,
  );

  return user;
});
