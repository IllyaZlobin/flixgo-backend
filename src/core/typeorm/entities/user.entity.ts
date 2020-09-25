import { BeforeInsert, Column, Entity, Index, OneToMany } from 'typeorm';
import { UserRole, UserStatus } from '../../models/enums';
import { IUser } from '../../models';
import { AbstractEntity } from './base.entity';
import { CommentsResponse } from './commentsResponse.entity';
import { MovieComments } from './movieComments.entity';
import { MovieRating } from './movieRating.entity';
import * as bcrypt from 'bcrypt';
import { Session } from './session.entity';

@Entity('user')
export class User extends AbstractEntity implements IUser {
  @Column('varchar')
  firstName: string;

  @Column('varchar', { nullable: true })
  lastName?: string;

  @Column('varchar')
  userName: string;

  @Column('varchar', { unique: true })
  @Index()
  email: string;

  @Column('varchar')
  password: string;

  @Column({ type: 'enum', enum: UserRole })
  role: UserRole;

  @Column({ type: 'enum', enum: UserStatus })
  status: UserStatus;

  @OneToMany(
    type => Session,
    session => session.user,
  )
  sessions: Session[];

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
    const salt = await bcrypt.genSalt(Number(process.env.PASSWORD_SALT));

    this.password = await bcrypt.hash(password || this.password, salt);
  }
}
