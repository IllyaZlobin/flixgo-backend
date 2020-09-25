import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { MovieQuality, MovieStatus } from '../../models/enums';
import { IMovie } from '../../models';
import { AbstractEntity } from './base.entity';
import { Country } from './country.entity';
import { MoviePhotos } from './moviePhotos.entity';
import { MovieRating } from './movieRating.entity';

@Entity('movie')
export class Movie extends AbstractEntity implements IMovie {
  @Column('varchar')
  title: string;

  @Column('varchar')
  description: string;

  @Column('int')
  release: number;

  @Column('int')
  runtime: number;

  @Column('varchar')
  genre: string;

  @Column('int')
  age: number;

  @Column({ type: 'enum', enum: MovieStatus })
  status: MovieStatus;

  @Column('varchar')
  poster: string;

  @Column({ type: 'enum', enum: MovieQuality })
  quality: MovieQuality;

  @ManyToOne(
    type => Country,
    country => country.movies,
  )
  country: Country;

  @OneToMany(
    type => MoviePhotos,
    moviesPhotos => moviesPhotos.movie,
  )
  photos: MoviePhotos[];

  @OneToMany(
    type => MovieRating,
    movieRating => movieRating.movie,
  )
  ratings: MovieRating[];
}
