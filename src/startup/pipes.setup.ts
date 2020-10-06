import { INestApplication } from '@nestjs/common';
import { AuthValidationSchemas } from '../modules/auth/dto/authValidation.schemas';
import { JoiValidationPipe } from '../core/nest';
import { MovieValidationSchemas } from '../modules/movies/dto/movieValidation.schemas';
import { UserValidationSchemas } from '../modules/user/dto/userValidation.schemas';

export const setupPipes = (app: INestApplication): void => {
  app.useGlobalPipes(new JoiValidationPipe({
    ...AuthValidationSchemas,
    ...MovieValidationSchemas,
    ...UserValidationSchemas
  }));
};
