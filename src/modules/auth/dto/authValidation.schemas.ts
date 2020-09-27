import { JoiRegisteredSchemas } from '../../../core/nest';
import { LoginRequestValidationSchema } from './login/loginRequestValidation.schema';
import { RefreshRequestValidationSchema } from './refresh/refreshRequest.schema';

export const AuthValidationSchemas: JoiRegisteredSchemas = {
  LoginRequest: LoginRequestValidationSchema,
  RefreshRequest: RefreshRequestValidationSchema
};
