import { Movie } from '../../../../core/typeorm';
import { MovieDto } from '../common/movie.dto';
export class MovieGetAllResponse {
  items: MovieDto[];
  totalCount: number;

  constructor(items?: Movie[], totalCount?: number) {
    this.items = items;
    this.totalCount = totalCount;
  }
}
