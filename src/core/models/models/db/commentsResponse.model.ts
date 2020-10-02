import { IUser } from '.';
import { IBaseModel } from './base.model';
import { IMovieComments } from './movieComments.model';

export interface ICommentsResponse extends IBaseModel {
  like?: number;
  dislike?: number;
  user?: IUser;
  movieComment?: IMovieComments;
}
