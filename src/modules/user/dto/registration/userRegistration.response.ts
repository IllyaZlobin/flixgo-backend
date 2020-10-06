import { User } from '../../../../core/typeorm';

export class UserRegistrationResponse {
  user: User;

  constructor(user?: User) {
    this.user = user;
  }
}
