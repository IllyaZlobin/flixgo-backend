import { IBaseModel } from './base.model';
import { IMovie } from './movie.model';

export interface ICountry extends IBaseModel {
  name: string;
  region: string;
  movies: IMovie[];
}
