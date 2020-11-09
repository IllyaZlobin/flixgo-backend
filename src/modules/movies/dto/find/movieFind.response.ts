import { MovieDto } from '../common/movie.dto';
import { Movie } from './../../../../core/typeorm/entities/movie.entity';

export class MovieFindResponse {
  movies: MovieDto[];

  constructor(movies?: Movie[]) {
    this.movies = movies;
  }
}
