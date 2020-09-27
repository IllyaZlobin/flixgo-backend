import { INestApplication } from '@nestjs/common';
import { AuthValidationSchemas } from '../modules/auth/dto/authValidation.schemas';
import { JoiValidationPipe } from '../core/nest';

export const setupPipes = (app: INestApplication): void => {
  app.useGlobalPipes(new JoiValidationPipe({
    ...AuthValidationSchemas
  }));
};
