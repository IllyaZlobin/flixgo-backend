import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserRegistrationRequest } from './dto/registration/userRegistration.request';
import { UserRegistrationResponse } from './dto/registration/userRegistration.response';
import { UserService } from './user.service';

@Controller('user')
@ApiTags('user')
export class UserController {
  constructor(private readonly _userService: UserService) {}

  @Post('/')
  async registration(@Body() model: UserRegistrationRequest) {
    const user = await this._userService.registration(model);

    const response = new UserRegistrationResponse(user);

    return response;
  }
}
