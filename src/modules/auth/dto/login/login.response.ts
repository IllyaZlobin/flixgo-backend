import { ApiProperty } from '@nestjs/swagger';
import { UserDto } from '../../../user/dto/common/user.dto';

export class LoginResponse {
  @ApiProperty({ type: UserDto })
  user: UserDto;

  @ApiProperty()
  accessToken: string;

  @ApiProperty()
  refreshToken: string;

  constructor(user: UserDto, accessToken: string, refreshToken: string) {
    this.user = user;
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
  }
}
