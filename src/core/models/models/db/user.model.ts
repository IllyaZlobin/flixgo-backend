import { UserRole } from '../../enums';
import { IBaseModel } from './base.model';
import { ICommentsResponse } from './commentsResponse.model';
import { IMovieComments } from './movieComments.model';
import { IMovieRating } from './movieRating.model';

export interface IUser extends IBaseModel {
  firstName: string;
  lastName?: string;
  userName: string;
  email: string;
  password: string;
  role: UserRole;
  commentsResponses: ICommentsResponse[];
  movieComments: IMovieComments[];
  movieRatings: IMovieRating[];
}
