import { ICountry } from '../models/country.model';
import { AbstractEntity } from './base.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { Movie } from './movie.entity';

@Entity('country')
export class Country extends AbstractEntity implements ICountry {
  @Column('varchar')
  name: string;

  @Column('varchar')
  region: string;

  @OneToMany(
    type => Movie,
    movie => movie.country,
  )
  movies: Movie[];
}
