import { ICountry, IMovieComments, IMoviePhotos, IMovieRating } from '.';
import { MovieQuality, MovieStatus } from '../../enums';
import { IBaseModel } from './base.model';

export interface IMovie extends IBaseModel {
  title: string;
  description: string;
  release: number;
  runtime: number;
  genre: string;
  age: number;
  status: MovieStatus;
  poster?: string;
  quality: MovieQuality;
  country: ICountry;
  photos?: IMoviePhotos[];
  ratings?: IMovieRating[];
  comments?: IMovieComments[];
}
