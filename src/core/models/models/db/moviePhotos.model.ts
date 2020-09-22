import { IBaseModel } from './base.model';
import { IMovie } from './movie.model';

export interface IMoviePhotos extends IBaseModel {
  photo: string;
  movie: IMovie;
}
