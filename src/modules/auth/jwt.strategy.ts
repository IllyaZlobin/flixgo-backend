import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ICurrentUser, ITokenPayload } from '../../core/models';
import { ConfigService } from '../../shared/services/config.service';
import { UserService } from '../user/user.service';
import { TokenService } from './token.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    public readonly _configService: ConfigService,
    public readonly _userService: UserService,
    public readonly _tokenService: TokenService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: _configService.get('JWT_SECRET_KEY'),
    });
  }

  async validate(payload: ITokenPayload): Promise<ICurrentUser> {
    const { id } = payload;

    const user = await this._userService.findById(id);

    if (!user) {
      throw new UnauthorizedException('Invalid token');
    }

    const { email, role } = user;

    await this._tokenService.checkUserAccessToken(user, payload);

    return { id, email, role };
  }
}
