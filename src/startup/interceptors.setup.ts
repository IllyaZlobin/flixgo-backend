import { INestApplication } from '@nestjs/common';
import { ToApiResponseInterceptor } from '../core/nest';

export const setupInterceptors = (app: INestApplication): void  => {
  app.useGlobalInterceptors(new ToApiResponseInterceptor());
}
