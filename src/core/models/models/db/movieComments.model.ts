import { IBaseModel } from './base.model';
import { IUser } from './user.model';

export interface IMovieComments extends IBaseModel {
  text: string;
  user: IUser;
}
