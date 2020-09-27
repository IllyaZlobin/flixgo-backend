import { Injectable } from '@nestjs/common';
import { User } from '../../core/typeorm';
import { NotFoundException, validateHash } from '../../core/nest';
import { UserService } from '../user/user.service';
import { LoginRequest } from './dto/login/login.request';
import { LoginResponse } from './dto/login/login.response';
import { ICurrentUser, ITokenPayload } from '../../core/models';
import { TokenService } from './token.service';
import { RefreshResponse } from './dto/refresh/refresh.response';

@Injectable()
export class AuthService {
  private tokenPayload: ITokenPayload;

  constructor(
    private readonly _userService: UserService,
    private readonly _tokenService: TokenService,
  ) {}

  async login(model: LoginRequest): Promise<LoginResponse> {
    const { email, password } = model;

    const user = await this.validateUser(email, password);

    this.tokenPayload = {
      email: user.email,
      id: user.id,
      role: user.role,
      type: 'access',
    };

    const accessToken = await this._tokenService.createAccessToken(
      this.tokenPayload,
    );
    const refreshToken = await this._tokenService.createRefreshToken({
      id: user.id,
      type: 'refresh',
    });

    await this._tokenService.createSession(user, accessToken, refreshToken);

    const response = new LoginResponse(user, accessToken, refreshToken);

    return response;
  }

  async refresh(
    user: ICurrentUser,
    oldRefreshToken: string,
  ): Promise<RefreshResponse> {
    await this._tokenService.checkToken(oldRefreshToken);

    const session = await this._tokenService.checkUserRefreshToken(
      oldRefreshToken,
      user,
    );

    const accessToken = await this._tokenService.createAccessToken({
      email: user.email,
      id: user.id,
      role: user.role,
      type: 'access',
    });

    const refreshToken = await this._tokenService.createRefreshToken({
      id: user.id,
      type: 'refresh',
    });
    await this._tokenService.updateSession(session.id, {
      ...session,
      accessToken,
      refreshToken,
    });

    const response = new RefreshResponse(accessToken, refreshToken);

    return response;
  }

  public async logout(user: ICurrentUser): Promise<void> {
    await this._tokenService.deleteUserSession(user);
  }

  private async validateUser(email: string, password: string): Promise<User> {
    const user = await this._userService.findByEmail(email);

    if (!user) {
      throw new NotFoundException('User is not found', ['email']);
    }

    const isValidPassword = await validateHash(password, user.password);

    if (!isValidPassword) {
      throw new NotFoundException('User with passed password is not found', [
        'password',
      ]);
    }

    return user;
  }
}
