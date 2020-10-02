import { JoiRegisteredSchemas } from '../../../core/nest';
import { MovieCreateRequestValidationSchema } from './create/movieCreateRequestValidation.schema';

export const MovieValidationSchemas: JoiRegisteredSchemas = {
  MovieCreateRequest: MovieCreateRequestValidationSchema,
};
