import { IPagedResult } from '../../../../core/nest';

export class MovieGetAllRequest implements IPagedResult {
  limit: number;
  offset: number;
}
