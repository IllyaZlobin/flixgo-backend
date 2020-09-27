import { UserRole } from '../enums';

export interface ICurrentUser {
  id: number;
  email: string;
  role: UserRole;
}
