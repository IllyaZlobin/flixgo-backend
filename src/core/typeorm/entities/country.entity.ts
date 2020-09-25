import { ICountry } from '../../models';
import { AbstractEntity } from './base.entity';
import { Column, Entity, Index, OneToMany } from 'typeorm';
import { Movie } from './movie.entity';

@Entity('country')
export class Country extends AbstractEntity implements ICountry {
  @Column('varchar', { nullable: false, unique: true })
  @Index()
  name: string;

  @Column('varchar', { nullable: false, unique: true })
  code: string;

  @OneToMany(
    type => Movie,
    movie => movie.country,
  )
  movies: Movie[];
}
