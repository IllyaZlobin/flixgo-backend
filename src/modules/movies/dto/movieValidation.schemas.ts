import { JoiRegisteredSchemas } from '../../../core/nest';
import { MovieCreateRequestValidationSchema } from './create/movieCreateRequestValidation.schema';
import { MovieGetAllRequestValidationSchema } from './getAll/movieGetAllRequestValidation.schema';

export const MovieValidationSchemas: JoiRegisteredSchemas = {
  MovieCreateRequest: MovieCreateRequestValidationSchema,
  MovieGetAllRequest: MovieGetAllRequestValidationSchema,
};
