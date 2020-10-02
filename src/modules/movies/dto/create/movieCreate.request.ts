import { File, MovieQuality, MovieStatus } from '../../../../core/models';

export class MovieCreateRequest {
  title: string;
  description: string;
  release: number;
  runtime: number;
  genre: string;
  age: number;
  status: MovieStatus;
  quality: MovieQuality;
  country: string;
  photos: File[];

  constructor(
    title: string,
    description: string,
    release: number,
    runtime: number,
    genre: string,
    quality: MovieQuality,
    country: string,
    photos: File[],
  ) {
    this.title = title;
    this.description = description;
    this.release = release;
    this.runtime = runtime;
    this.genre = genre;
    this.quality = quality;
    this.country = country;
    this.photos = photos;
  }
}
