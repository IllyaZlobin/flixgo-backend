import { BeforeInsert, Column, Entity, OneToMany } from 'typeorm';
import { UserRole } from '../../models/enums';
import { IUser } from '../../models';
import { AbstractEntity } from './base.entity';
import { CommentsResponse } from './commentsResponse.entity';
import { MovieComments } from './movieComments.entity';
import { MovieRating } from './movieRating.entity';
import * as bcrypt from 'bcrypt';

@Entity('user')
export class User extends AbstractEntity implements IUser {
  @Column('varchar')
  name: string;

  @Column('varchar')
  email: string;

  @Column('varchar')
  password: string;

  @Column({ type: 'enum', enum: UserRole })
  role: UserRole;

  @OneToMany(
    type => CommentsResponse,
    commentsResponse => commentsResponse.user,
  )
  commentsResponses: CommentsResponse[];

  @OneToMany(
    type => MovieComments,
    movieComments => movieComments.user,
  )
  movieComments: MovieComments[];

  @OneToMany(
    type => MovieRating,
    movieRatings => movieRatings.user,
  )
  movieRatings: MovieRating[];

  @BeforeInsert()
  async setPassword(password: string): Promise<void> {
    const salt = await bcrypt.genSalt(process.env.PASSWORD_SALT);
    this.password = await bcrypt.hash(password || this.password, salt);
  }
}
