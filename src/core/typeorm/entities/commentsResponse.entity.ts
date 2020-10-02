import { Column, Entity, ManyToOne } from 'typeorm';
import { ICommentsResponse } from '../../models';
import { AbstractEntity } from './base.entity';
import { MovieComments } from './movieComments.entity';
import { User } from './user.entity';

@Entity('comments_response')
export class CommentsResponse extends AbstractEntity
  implements ICommentsResponse {
  @Column('int')
  like?: number;

  @Column('int')
  dislike?: number;

  @ManyToOne(
    type => User,
    user => user.commentsResponses,
  )
  user?: User;

  @ManyToOne(
    type => MovieComments,
    movieComments => movieComments.commentsResponses,
  )
  movieComment?: MovieComments;
}
