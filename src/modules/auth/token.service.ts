import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Session, User } from '../../core/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '../../shared/services/config.service';
import { ICurrentUser, ITokenPayload } from '../../core/models';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as _ from 'lodash';

@Injectable()
export class TokenService {
  private refreshTokenExpiration: number;

  constructor(
    private readonly _configService: ConfigService,
    @InjectRepository(Session)
    private readonly _sessionRepository: Repository<Session>,
    private readonly _jwtService: JwtService,
  ) {
    this.refreshTokenExpiration = _configService.getNumber(
      'JWT_REFRESH_EXPIRATION_TIME',
    );
  }

  /**
   * @description create access token by payload
   * @param payload
   * @returns accessToken
   */
  async createAccessToken(payload: ITokenPayload): Promise<string> {
    const token = await this._jwtService.signAsync(payload);

    return token;
  }

  /**
   * description: create refresh token by payload
   * @param payload
   * @returns refreshToken
   */
  async createRefreshToken(payload: Partial<ITokenPayload>): Promise<string> {
    const token = await this._jwtService.signAsync(payload, {
      expiresIn: this.refreshTokenExpiration,
    });

    return token;
  }

  /**
   * @description create new session for passed user
   * @param user
   * @param accessToken
   * @param refreshToken
   * @param ipAddress
   * @returns Session
   */
  async createSession(
    user: User,
    accessToken: string,
    refreshToken: string,
    ipAddress?: string,
  ): Promise<Session> {
    const existedSession = await this._sessionRepository.findOne({
      where: { user },
    });

    if (existedSession) {
      await this._sessionRepository.delete(existedSession.id);
    }

    const session = new Session(); //TODO Constructor?
    session.user = user;
    session.accessToken = accessToken;
    session.refreshToken = refreshToken;

    const response = await this._sessionRepository.save(session);

    return response;
  }

  /**
   * @description update session data
   * @param id
   * @param session
   */
  public async updateSession(id: number, session: Session): Promise<void> {
    await this._sessionRepository.update(id, session);
  }

  /**
   * @description Delete session data of user
   * @param user
   */
  public async deleteUserSession(user: ICurrentUser): Promise<void> {
    const session = await this._sessionRepository.findOne({ where: { user } });

    await this._sessionRepository.delete(session);
  }

  /**
   * @description check refresh token for current user
   * @param refreshToken
   * @param user
   * @returns Session
   */
  public async checkUserRefreshToken(
    refreshToken: string,
    user: ICurrentUser,
  ): Promise<Session> {
    const result = await this._sessionRepository.findOne({
      where: { refreshToken, user },
    });

    if (!result) {
      throw new BadRequestException('Token does not belong to you');
    }

    return result;
  }

  /**
   * @description check current access token in user and session table
   * @param user
   * @param tokenPayload
   */
  public async checkUserAccessToken(
    user: ICurrentUser,
    tokenPayload: ITokenPayload,
  ): Promise<void> {
    const session = await this._sessionRepository.findOne({
      where: { user },
    });

    if (!session) {
      throw new UnauthorizedException('Wrong access token');
    }

    const { accessToken } = session;

    const payload = await this.checkToken(accessToken);

    const payloadDiff = _.isEqual(tokenPayload, payload);

    if (!payloadDiff) {
      throw new UnauthorizedException('Wrong access token');
    }
  }

  /**
   * @description check valid of passed jwt token
   * @returns ITokenPayload
   * @param refreshToken
   */
  public async checkToken(token: string): Promise<ITokenPayload> {
    try {
      const { payload } = await this._jwtService.verifyAsync(token, {
        complete: true,
      });

      return payload;
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }
}
