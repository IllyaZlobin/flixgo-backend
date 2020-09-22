import { IPagedResult } from './pagedResult';

export interface PagedAndSortedResult extends IPagedResult {
  sorting?: string;
}
