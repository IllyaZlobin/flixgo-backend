import { IUser } from '.';
import { IBaseModel } from './base.model';
import { IMovieComments } from './movieComments.model';

export interface ICommentsResponse extends IBaseModel {
  like?: boolean;
  dislike?: boolean;
  user?: IUser;
  movieComment?: IMovieComments;
}
