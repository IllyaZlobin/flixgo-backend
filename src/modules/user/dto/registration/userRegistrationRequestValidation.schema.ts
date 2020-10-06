import Joi = require("@hapi/joi");
import { UserRegistrationRequest } from "./userRegistration.request";

export const UserRegistrationRequestValidationSchema = Joi.object<UserRegistrationRequest>({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  username: Joi.string().required(),
  firstname: Joi.string().required(),
  lastname: Joi.string().optional(),  
})