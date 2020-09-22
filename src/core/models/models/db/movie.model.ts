import { ICountry, IMoviePhotos, IMovieRating } from '.';
import { MovieStatus } from '../enums';
import { IBaseModel } from './base.model';

export interface IMovie extends IBaseModel {
  title: string;
  description: string;
  release: number;
  runtime: number;
  genre: string;
  age: number;
  status: MovieStatus;
  poster: string;
  country: ICountry;
  photos: IMoviePhotos[];
  ratings: IMovieRating[];
}
