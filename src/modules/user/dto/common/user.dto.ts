import {
  ICommentsResponse,
  IMovieComments,
  IMovieRating,
  ISession,
  IUser,
  UserRole,
  UserStatus,
} from '../../../../core/models';

export class UserDto implements IUser {
  firstName: string;
  lastName?: string;
  userName: string;
  email: string;
  password: string;
  role: UserRole;
  status: UserStatus;
  sessions: ISession[];
  commentsResponses: ICommentsResponse[];
  movieComments: IMovieComments[];
  movieRatings: IMovieRating[];
  id: number;
  createdAt: Date;
  updatedAt: Date;
}
