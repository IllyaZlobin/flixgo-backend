import { Column, Entity, ManyToOne } from 'typeorm';
import { IMovieRating } from '../models/movieRating.model';
import { AbstractEntity } from './base.entity';
import { Movie } from './movie.entity';
import { User } from './user.entity';

@Entity('movie_rating')
export class MovieRating extends AbstractEntity implements IMovieRating {
  @ManyToOne(
    type => Movie,
    movie => movie.ratings,
  )
  movie: Movie;

  @ManyToOne(
    type => User,
    user => user.movieRatings,
  )
  user: User;

  @Column('int')
  rating: number;
}
