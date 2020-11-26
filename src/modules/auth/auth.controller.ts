import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { ICurrentUser } from '../../core/models';
import { AuthGuard, AuthUser } from '../../core/nest';
import { AuthService } from './auth.service';
import { LoginRequest } from './dto/login/login.request';
import { LoginResponse } from './dto/login/login.response';
import { RefreshRequest } from './dto/refresh/refresh.request';
import { RefreshResponse } from './dto/refresh/refresh.response';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly _authService: AuthService) {}

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'User login' })
  @ApiOkResponse({
    type: LoginResponse,
    description:
      'After success login will return object with user, access and refresh tokens',
  })
  @ApiNotFoundResponse({
    description:
      'If passed credentials is not valid, will return not found error',
  })
  async login(@Body() loginRequest: LoginRequest): Promise<LoginResponse> {
    console.log(`body`, loginRequest)
    const response = await this._authService.login(loginRequest);

    return response;
  }

  @Put('/refresh')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Refresh token' })
  @ApiOkResponse({
    type: RefreshResponse,
    description:
      'Will return pair of access and refresh token for current user',
  })
  @ApiBadRequestResponse({
    description: 'Return bad request if passed refresh token is invalid',
  })
  async refresh(
    @AuthUser() user: ICurrentUser,
    @Body() model: RefreshRequest,
  ): Promise<RefreshResponse> {
    const response = await this._authService.refresh(user, model.refreshToken);

    return response;
  }

  @Get('logout')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'User logout' })
  async logout(@AuthUser() user: ICurrentUser): Promise<void> {
    await this._authService.logout(user);
  }
}
