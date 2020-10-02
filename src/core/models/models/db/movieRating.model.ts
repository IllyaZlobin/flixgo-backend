import { IBaseModel } from './base.model';
import { IMovie } from './movie.model';
import { IUser } from './user.model';

export interface IMovieRating extends IBaseModel {
  movie?: IMovie;
  user?: IUser;
  rating?: number;
}
