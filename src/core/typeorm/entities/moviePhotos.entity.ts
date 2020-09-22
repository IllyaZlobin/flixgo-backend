import { Column, Entity, ManyToOne } from 'typeorm';
import { IMoviePhotos } from '../../models';
import { AbstractEntity } from './base.entity';
import { Movie } from './movie.entity';

@Entity('movie_photos')
export class MoviePhotos extends AbstractEntity implements IMoviePhotos {
  @Column('varchar')
  photo: string;

  @ManyToOne(
    type => Movie,
    movie => movie.photos,
  )
  movie: Movie;
}
