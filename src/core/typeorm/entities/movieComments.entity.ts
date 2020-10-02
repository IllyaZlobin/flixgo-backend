import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { CommentsResponse } from '.';
import { IMovieComments } from '../../models';
import { AbstractEntity } from './base.entity';
import { Movie } from './movie.entity';
import { User } from './user.entity';

@Entity('movie_comments')
export class MovieComments extends AbstractEntity implements IMovieComments {
  @Column('varchar')
  text: string;

  @ManyToOne(
    type => User,
    user => user.movieComments,
  )
  user?: User;

  @ManyToOne(
    type => Movie,
    movie => movie.comments,
  )
  movie?: Movie;

  @OneToMany(
    type => CommentsResponse,
    commentsResponse => commentsResponse.movieComment,
  )
  commentsResponses?: CommentsResponse[];
}
