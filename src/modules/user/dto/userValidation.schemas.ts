import { JoiRegisteredSchemas } from '../../../core/nest';
import { UserRegistrationRequestValidationSchema } from './registration/userRegistrationRequestValidation.schema';

export const UserValidationSchemas: JoiRegisteredSchemas = {
  UserRegistrationRequest: UserRegistrationRequestValidationSchema,
};
