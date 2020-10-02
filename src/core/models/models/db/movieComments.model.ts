import { IMovie, IUser } from '../..';
import { IBaseModel } from './base.model';
import { ICommentsResponse } from './commentsResponse.model';

export interface IMovieComments extends IBaseModel {
  text: string;
  user?: IUser;
  movie?: IMovie;
  commentsResponses?: ICommentsResponse[]
}
