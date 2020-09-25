import { ISession, IUser } from 'src/core/models';
import { Column, Entity, ManyToOne } from 'typeorm';
import { AbstractEntity } from './base.entity';
import { User } from './user.entity';

@Entity('session')
export class Session extends AbstractEntity implements ISession {
  @Column('varchar')  
  accessToken: string;

  @Column('varchar')
  refreshToken: string;

  @Column('varchar', { nullable: true })
  ipAddress?: string;

  @ManyToOne(type => User, user => user.sessions)
  user: IUser;
}
