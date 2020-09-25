import { UserStatus, UserRole } from '../../enums';
import { IBaseModel } from './base.model';
import { ICommentsResponse } from './commentsResponse.model';
import { IMovieComments } from './movieComments.model';
import { IMovieRating } from './movieRating.model';
import { ISession } from './session.model';

export interface IUser extends IBaseModel {
  firstName: string;
  lastName?: string;
  userName: string;
  email: string;
  password: string;
  role: UserRole;
  status: UserStatus,
  sessions: ISession[],
  commentsResponses: ICommentsResponse[];
  movieComments: IMovieComments[];
  movieRatings: IMovieRating[];
}
