import {
  ICountry,
  IMovie,
  IMoviePhotos,
  IMovieRating,
  MovieQuality,
  MovieStatus,
} from '../../../../core/models';

export class MovieDto implements IMovie {
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
  id: number;
  createdAt: Date;
  updatedAt: Date;

  constructor(
    id: number,
    title: string,
    description: string,
    release: number,
    runtime: number,
    genre: string,
    quality: MovieQuality,
    country: ICountry,
    poster?: string,
    photos?: IMoviePhotos[],
    ratings?: IMovieRating[],
    createdAt?: Date,
    updatedAt?: Date,
  ) {
    this.title = title;
    this.description = description;
    this.release = release;
    this.runtime = runtime;
    this.genre = genre;
    this.poster = poster;
    this.quality = quality;
    this.country = country;
    this.photos = photos;
    this.ratings = ratings;
    this.id = id;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
