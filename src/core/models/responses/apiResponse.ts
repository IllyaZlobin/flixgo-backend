import { ValidationError } from '../models';

export interface ApiBaseResponse<T> {
  errors: ValidationError[];
  data: T;
}
