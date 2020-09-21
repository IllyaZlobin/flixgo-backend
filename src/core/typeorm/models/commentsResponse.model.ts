import { IUser } from '.';
import { IBaseModel } from './base.model';

export interface ICommentsResponse extends IBaseModel {
  like: number;
  dislike: number;
  user: IUser;
}
