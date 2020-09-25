import { ICountry } from '../../models';
import { AbstractEntity } from './base.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { Movie } from './movie.entity';

@Entity('country')
export class Country extends AbstractEntity implements ICountry {
  @Column('varchar')
  name: string;

  @Column('varchar')
  code: string;

  @OneToMany(
    type => Movie,
    movie => movie.country,
  )
  movies: Movie[];
}
