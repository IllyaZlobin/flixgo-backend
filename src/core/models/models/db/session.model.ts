import { IBaseModel } from './base.model';
import { IUser } from './user.model';

export interface ISession extends IBaseModel {
  accessToken: string;
  refreshToken: string;
  ipAddress?: string;
  user: IUser;
}
