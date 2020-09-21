import { Column, Entity, ManyToOne } from 'typeorm';
import { IMovieComments } from '../models/movieComments.model';
import { AbstractEntity } from './base.entity';
import { User } from './user.entity';

@Entity('movie_comments')
export class MovieComments extends AbstractEntity implements IMovieComments {
  @Column('varchar')
  text: string;

  @ManyToOne(
    type => User,
    user => user.movieComments,
  )
  user: User;
}
