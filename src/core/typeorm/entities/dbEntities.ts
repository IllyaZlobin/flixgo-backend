import { CommentsResponse } from './commentsResponse.entity';
import { Country } from './country.entity';
import { Movie } from './movie.entity';
import { MovieComments } from './movieComments.entity';
import { MoviePhotos } from './moviePhotos.entity';
import { MovieRating } from './movieRating.entity';
import { Session } from './session.entity';
import { User } from './user.entity';

export const DatabaseEntities = [
  Country,
  Movie,
  User,
  MovieComments,
  MoviePhotos,
  MovieRating,
  CommentsResponse,
  Session
];
