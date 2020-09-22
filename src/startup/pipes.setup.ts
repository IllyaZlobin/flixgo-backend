import { INestApplication } from '@nestjs/common';
import { JoiValidationPipe } from '../core/nest';

export const setupPipes = (app: INestApplication): void => {
  app.useGlobalPipes(new JoiValidationPipe({}));
};
