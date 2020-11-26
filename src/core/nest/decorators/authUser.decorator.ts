import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { ICurrentUser } from '../../../core/models';

export const AuthUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): ICurrentUser => {
    const request = ctx.switchToHttp().getRequest();

    return request.user;
  },
);
